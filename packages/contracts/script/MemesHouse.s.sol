// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import "../src/MemesHouse.sol";

contract MemesHouseScript is Script {
    function setUp() public {}

    function run() public {
        string memory seedPhrase = vm.readFile(".secret");
        uint256 privateKey = vm.deriveKey(seedPhrase, 0);
        vm.startBroadcast(privateKey);

        bytes20 postHash = bytes20(
            hex"9C2B59E75B5A6A61F2E584D79E5A26866CD0FA0B"
        );

        // Deploy the contract, then call initialize.
        MemesHouse memeshouse = new MemesHouse();
        memeshouse.initMarket(postHash);
    }
}
