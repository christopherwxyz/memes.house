// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MemesHouse {
    // Constants
    uint256 public constant MINIMUM_STAKE = 100000000000000; // 0.0001 ETH

    // Enums and Structs
    enum Vote {
        HILARIOUS,
        FUNNY,
        NEUTRAL,
        NOT_FUNNY,
        VERY_UNFUNNY
    }

    struct VotingData {
        Vote vote;
        uint256 stake;
        bool hasClaimedReward;
    }

    struct VotingMarket {
        uint256 votingEndTime;
        uint256 totalVoters;
        uint256 totalStake;
        uint256 mean;
        uint256 standardDeviation;
        int256 sumOfVotes;
        int256 sumOfSquaredVotes;
        bool votingEnded;
        address[] voterAddresses;
    }

    enum MarketState {
        NOT_INITIATED,
        INITIATED,
        COMPLETED,
        FAILED
    }

    // State variables
    address public owner;
    bool contractPaused = false;
    mapping(bytes20 => VotingMarket) public markets; // post hash to VotingMarket
    mapping(bytes20 => mapping(address => VotingData)) votes;
    mapping(address => uint256) public pendingWithdrawals;

    // Events
    event MarketInitialized(bytes20 postHash);
    event Voted(address indexed voter, Vote voteType, uint256 stake);
    event RewardsDistributed();
    event ContractPaused();
    event ContractResumed();
    event StakesRefunded();
    event RewardOrRefundClaimed(address indexed voter, uint256 amount);
    event VotingCancelled(bytes20 postHash);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier notPaused() {
        require(!contractPaused, "Contract is paused");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // View functions
    function getVotingSummary(
        bytes20 postHash
    )
        external
        view
        returns (
            uint256 _totalVoters,
            uint256 _totalStake,
            uint256 _mean,
            uint256 _standardDeviation,
            int256 _sumOfVotes,
            int256 _sumOfSquaredVotes
        )
    {
        return (
            markets[postHash].totalVoters,
            markets[postHash].totalStake,
            markets[postHash].mean,
            markets[postHash].standardDeviation,
            markets[postHash].sumOfVotes,
            markets[postHash].sumOfSquaredVotes
        );
    }

    function marketExists(bytes20 postHash) public view returns (bool) {
        if (markets[postHash].votingEndTime == 0) {
            return false;
        }
        return true;
    }

    function getMarketState(
        bytes20 postHash
    ) external view returns (MarketState, VotingMarket memory) {
        VotingMarket memory mar = markets[postHash];

        // If the votingEndTime is zero, market was never initiated
        if (mar.votingEndTime == 0) {
            return (MarketState.NOT_INITIATED, mar);
        }

        // If the voting has ended, check the number of voters to determine COMPLETED or FAILED
        if (block.timestamp > mar.votingEndTime) {
            if (mar.totalVoters < 20) {
                // Assuming less than 20 voters is a failure criterion, adjust if needed
                return (MarketState.FAILED, mar);
            }
            return (MarketState.COMPLETED, mar);
        }

        // If the market is within voting time
        return (MarketState.INITIATED, mar);
    }

    function marketEnds(bytes20 postHash) public view returns (uint256) {
        return markets[postHash].votingEndTime;
    }

    function getVoterAddressCount(
        bytes20 postHash
    ) external view returns (uint256) {
        return markets[postHash].voterAddresses.length;
    }

    function getVotingDataByIndex(
        uint256 index,
        bytes20 postHash
    )
        external
        view
        returns (address _voterAddress, VotingData memory _votingData)
    {
        require(
            index < markets[postHash].voterAddresses.length,
            "Index out of bounds"
        );
        _voterAddress = markets[postHash].voterAddresses[index];
        _votingData = votes[postHash][_voterAddress];
    }

    function initMarket(bytes20 postHash) external {
        require(
            !marketExists(postHash),
            "Market already exists for the given postHash."
        );

        address[] memory va;
        markets[postHash] = VotingMarket({
            votingEndTime: block.timestamp + 1800, // Hardcoded for now.
            totalVoters: 0,
            totalStake: 0,
            mean: 0,
            standardDeviation: 0,
            sumOfVotes: 0,
            sumOfSquaredVotes: 0,
            votingEnded: false,
            voterAddresses: va
        });

        emit MarketInitialized(postHash);
    }

    function getVoteValue(Vote _voteValue) internal pure returns (int256) {
        if (_voteValue == Vote.VERY_UNFUNNY) return -2;
        if (_voteValue == Vote.NOT_FUNNY) return -1;
        if (_voteValue == Vote.NEUTRAL) return 0;
        if (_voteValue == Vote.FUNNY) return 1;
        if (_voteValue == Vote.HILARIOUS) return 2;
        revert("Invalid vote");
    }

    // Vote function
    function vote(Vote _vote, bytes20 postHash) external payable notPaused {
        require(msg.value >= MINIMUM_STAKE, "Minimum stake is 0.0001 ETH");
        VotingMarket memory mar = markets[postHash];
        require(block.timestamp < mar.votingEndTime, "Voting has ended");
        require(
            votes[postHash][msg.sender].stake == 0,
            "You have already voted"
        );

        votes[postHash][msg.sender] = VotingData({
            vote: _vote,
            stake: msg.value,
            hasClaimedReward: false
        });

        markets[postHash].voterAddresses.push(msg.sender); // Add the voter's address to the array

        markets[postHash].totalStake += msg.value;
        markets[postHash].totalVoters += 1;
        int256 voteValue = getVoteValue(_vote);
        markets[postHash].sumOfVotes += voteValue;
        markets[postHash].sumOfSquaredVotes += voteValue * voteValue; // Storing squared value

        emit Voted(msg.sender, _vote, msg.value);
    }

    // Calculation of mean and standard deviation (optimized with intermediate results)
    function calculateMeanAndStandardDeviation(bytes20 postHash) internal {
        VotingMarket memory mar = markets[postHash];
        uint256 fixedPointFactor = 1e18;
        markets[postHash].mean = uint256(
            (mar.sumOfVotes * int256(fixedPointFactor)) /
                int256(mar.totalVoters)
        );

        int256 varianceInt = (mar.sumOfSquaredVotes -
            ((mar.sumOfVotes * mar.sumOfVotes) / int256(mar.totalVoters))) /
            int256(mar.totalVoters);
        uint256 variance = uint256(
            varianceInt > 0 ? varianceInt : -varianceInt
        );

        // Calculate standard deviation
        mar.standardDeviation = sqrt(variance);
    }

    // Implementing Babylonian method for square root as an example.
    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function absoluteDifference(
        uint256 a,
        uint256 b
    ) internal pure returns (uint256) {
        if (a > b) return a - b;
        else return b - a;
    }

    // Distribution of stakes
    function distributeStakes(bytes20 postHash) external onlyOwner {
        VotingMarket memory mar = markets[postHash];
        require(block.timestamp > mar.votingEndTime, "Voting is still ongoing");
        require(!mar.votingEnded, "Voting has already been processed");

        uint256 fixedPointFactor = 1e18;
        if (mar.totalVoters < 20) {
            for (uint256 i = 0; i < mar.voterAddresses.length; i++) {
                address voterAddress = mar.voterAddresses[i];
                uint256 stake = votes[postHash][voterAddress].stake;
                pendingWithdrawals[voterAddress] += stake;
                votes[postHash][voterAddress].hasClaimedReward = true; // Mark as claimed/refunded
            }
            emit StakesRefunded();
        } else {
            calculateMeanAndStandardDeviation(postHash);

            uint256 rewardPool = 0;
            for (uint256 i = 0; i < mar.voterAddresses.length; i++) {
                address voterAddress = mar.voterAddresses[i];
                uint256 diff = absoluteDifference(
                    uint256(getVoteValue(votes[postHash][voterAddress].vote)) *
                        fixedPointFactor,
                    mar.mean
                );

                if (diff > mar.standardDeviation) {
                    rewardPool += votes[postHash][voterAddress].stake; // Add to reward pool if outside 1 standard deviation
                }
            }

            for (uint256 i = 0; i < mar.voterAddresses.length; i++) {
                address voterAddress = mar.voterAddresses[i];
                uint256 diff = absoluteDifference(
                    uint256(getVoteValue(votes[postHash][voterAddress].vote)) *
                        fixedPointFactor,
                    mar.mean
                );

                if (diff <= mar.standardDeviation) {
                    uint256 reward = rewardPool / mar.totalVoters; // Divide reward among eligible voters
                    pendingWithdrawals[voterAddress] += reward;
                    votes[postHash][voterAddress].hasClaimedReward = true; // Mark as claimed
                }
            }
            pendingWithdrawals[owner] += address(this).balance;
        }
        mar.votingEnded = true;
    }

    function withdraw() external notPaused {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds available to withdraw");
        pendingWithdrawals[msg.sender] = 0; // reset before sending to avoid re-entrancy attacks
        payable(msg.sender).transfer(amount);
    }

    // Claiming rewards or refunds
    function claimRewardOrRefund(bytes20 postHash) external notPaused {
        VotingMarket memory mar = markets[postHash];
        require(mar.votingEnded, "Voting has not ended yet");
        VotingData storage voterData = votes[postHash][msg.sender];
        require(
            !voterData.hasClaimedReward,
            "Rewards or refunds already claimed"
        );

        uint256 amountToTransfer = 0;

        if (mar.totalVoters < 20) {
            amountToTransfer = voterData.stake;
        } else {
            uint256 fixedPointFactor = 1e18;
            uint256 diff = absoluteDifference(
                uint256(getVoteValue(voterData.vote)) * fixedPointFactor,
                mar.mean
            );

            if (diff <= mar.standardDeviation) {
                uint256 rewardPool = 0;

                for (uint256 i = 0; i < mar.voterAddresses.length; i++) {
                    address currentVoter = mar.voterAddresses[i];
                    uint256 currDiff = absoluteDifference(
                        uint256(
                            getVoteValue(votes[postHash][currentVoter].vote)
                        ) * fixedPointFactor,
                        mar.mean
                    );

                    if (currDiff > mar.standardDeviation) {
                        rewardPool += votes[postHash][currentVoter].stake;
                    }
                }

                uint256 reward = rewardPool / mar.totalVoters; // reward per eligible voter
                amountToTransfer = voterData.stake + reward;
            }
        }

        if (amountToTransfer > 0) {
            pendingWithdrawals[msg.sender] += amountToTransfer;
        }

        voterData.hasClaimedReward = true;
        emit RewardOrRefundClaimed(msg.sender, amountToTransfer);
    }

    // Security functions
    function pauseContract() external onlyOwner {
        contractPaused = true;
        emit ContractPaused();
    }

    function resumeContract() external onlyOwner {
        contractPaused = false;
        emit ContractResumed();
    }

    function cancelAndReturnFunds(bytes20 postHash) external onlyOwner {
        VotingMarket memory mar = markets[postHash];
        require(!mar.votingEnded, "Voting has already ended");

        for (uint256 i = 0; i < mar.voterAddresses.length; i++) {
            address voterAddress = mar.voterAddresses[i];
            uint256 stake = votes[postHash][voterAddress].stake;

            pendingWithdrawals[voterAddress] += stake;
        }

        mar.votingEnded = true;
        emit VotingCancelled(postHash);
    }
}
