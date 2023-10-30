// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {MemesHouse} from "../src/MemesHouse.sol";

contract MemesHouseTest is Test {
    MemesHouse public memeshouse;

    function setUp() public {
        bytes20 postHash = bytes20(
            hex"9C2B59E75B5A6A61F2E584D79E5A26866CD0FA0B"
        );
        memeshouse = new MemesHouse();
        memeshouse.initMarket(postHash);
    }

    function testVote() public {
        // Define the post hash
        bytes20 samplePostHash = bytes20(
            hex"9C2B59E75B5A6A61F2E584D79E5A26866CD0FA0B"
        );

        // Vote the minimum stake because we're cheap lol.
        memeshouse.vote{value: memeshouse.MINIMUM_STAKE()}(
            MemesHouse.Vote.FUNNY,
            samplePostHash
        );
    }
}
