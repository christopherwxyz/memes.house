import Image from "next/image";
import { baseGoerli } from 'viem/chains'
import { useContractRead, useContractReads } from 'wagmi'
import { contract } from '@/app/lib/contract'
import { getRelativeDate } from "@/app/lib/utils";

import { Avatar, Badge, Box, Container, Em, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCoins, faVoteYea, faStopwatch, faEye, faChartLine, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import VotingOptions from "@/app/components/vote/VotingOptions";

interface MarketData {
  0: number;
  1: {
    mean: bigint;
    standardDeviation: bigint;
    sumOfSquaredVotes: bigint;
    sumOfVotes: bigint;
    totalStake: bigint;
    totalVoters: bigint;
    voterAddresses: any[]; // You can replace 'any[]' with a more specific type if needed
    votingEndTime: bigint;
    votingEnded: boolean;
  };
}


export function MemeDetails() {
  const { data: data }: { data: MarketData | undefined } = useContractRead({
    ...contract,
    chainId: baseGoerli.id,
    functionName: 'getMarketState',
    args: ["0x9c2b59e75b5a6a61f2e584d79e5a26866cd0fa0b"]
  })

  console.log(data);
  const votingEndsDate = data ? getRelativeDate(Number(data[1].votingEndTime)) : null;
  const totalVoters = data ? data[1].totalVoters.toString() : 0;
  const totalStake = data ? data[1].totalStake.toString() : 0;
  const totalVotes = data ? data[1].sumOfVotes.toString() : 0;

  return (
    <div className="w-fit overflow-hidden rounded-md">
      <Box height="auto" width="auto">
        <Container display="block">
          <Flex justify="between" wrap="wrap" gap="3" direction="row">
            <Badge color="gray" className="mtb-3 gap-2">
              SOCIAL DETAILS
            </Badge>
            <Box>
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faComment} />
                <span>5</span>
              </Text>
            </Box>
            <Box>
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>25</span>
              </Text>
            </Box>
            <Box>
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} />
                <span>1500+</span>
              </Text>
            </Box>
            <Box
              style={{ backgroundColor: 'var(--dark)', borderRadius: 'var(--radius-3)', borderColor: 'var(--gray)' }}>
              <Text>
                <Avatar size={"1"} src="https://i.imgur.com/svJ32DG.jpg" fallback="C" />
                <Text size="4" weight="regular" className="pl-3">
                  christopherw.eth
                </Text>
              </Text>
            </Box>
          </Flex>
        </Container>
        <Separator my="3" size="4" />
        <Container display="block">
          <Flex gap="3" wrap="wrap" justify="between">
            <Badge color="gray" className="mtb-2 gap-2">
              VOTING DETAILS
            </Badge>
            <Box height="auto">
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStopwatch} />
                <span>{votingEndsDate || 'Loading...'}</span>
              </Text>
            </Box>
            <Box height="auto">
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} />
                <span>{totalVoters || 'Loading...'} voters</span>
              </Text>
            </Box>
            <Box height="auto">
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCoins} />
                <span>{totalStake || 'Loading...'} ETH staked</span>
              </Text>
            </Box>
            {/* <Box height="auto">
              <Text color="gray" size="4" weight="regular" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faVoteYea} />
                <span>{totalVotes || 'Loading...'} votes</span>
              </Text>
            </Box> */}
          </Flex>
        </Container>
      </Box>
    </div>
  );
}
