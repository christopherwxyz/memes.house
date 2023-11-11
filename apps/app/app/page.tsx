"use client";

import { useEffect, useState } from "react";
import { baseGoerli } from 'viem/chains'

import { MemeDetails } from "@/app/components/meme/MemeDetails";
import ConnectButton from "@/app/components/web3/ConnectButton";
import VotingOptions from "@/app/components/vote/VotingOptions";
import { Box, Container, Em, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

import { Playfair_Display } from "next/font/google";
const playfairDisplay = Playfair_Display({ subsets: ["latin"] });
import { Comments } from "@/app/components/comments/Comments";
import { useAccount, useContractRead, useContractReads } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MemeImage } from "@/app/components/meme/MemeImage";
 
export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="relative min-h-screen"> {/* Set a light gray background */}
      <Header />
      <MainContent />
    </div>
  );
}

function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-3 z-10 bg-opacity-75 backdrop-blur-md">
      <Container ml="3">
        <Link href="/">
          <Text className={playfairDisplay.className} size={"7"} weight="medium">
            Memes House
          </Text>
        </Link>
      </Container>
      {/* Connect Button */}
      <ConnectButton />
    </nav>
  );
}

function MainContent() {
  return (
    <main className="flex flex-col p-6 pt-24">
      <Flex className="flex-col space-y-4" direction="column" gap="1">
        <MemeGallery />
        <Comments />
      </Flex>
    </main>
  );
}

function MemeGallery() {
  return (
    <div>
      <Flex className="flex-col items-center space-y-4" direction="column" align="center" gap="1">
        <MemeDetails />
        <VotingOptions />
      </Flex>
    </div>
  );
}

