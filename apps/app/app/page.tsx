import Image from "next/image";
import { MemeCard } from "@/app/components/meme/MemeCard";
import { VoteDetails } from "@/app/components/vote/VoteDetails";
import ConnectButton from "@/app/components/web3/ConnectButton";
import VotingOptions from "@/app/components/vote/VotingOptions";
import { Box, Container, Em, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Comments } from "@/app/components/comments/Comments";

export default function Home() {
  return (
    <div className="relative min-h-screen p-24"> {/* Set a light gray background */}
      <Header />
      <MainContent />
    </div>
  );
}

function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-3 z-10 bg-opacity-75 backdrop-blur-md">
      {/* Logo with typographic for memes.house */}
      <div className="flex items-center space-x-2 pl-10">
        <Link href="/">
          <Text size={"8"} weight="regular">
            <Em>memes house</Em>
          </Text>
        </Link>
      </div>
      {/* Connect Button */}
      <ConnectButton />
    </nav>
  );
}

function MainContent() {
  return (
    <main className="flex flex-col p-6">
      <Flex className="flex-col space-y-4" direction="column" gap="1">
        <MemeGallery />
        <Comments />
        <VoteDetailsPanel />
      </Flex>
    </main>
  );
}

function MemeGallery() {
  return (
    <div>
      <Flex className="flex-col items-center space-y-4" direction="column" align="center" gap="1">
        <MemeCard />
        <VotingOptions />
      </Flex>
    </div>
  );
}

function VoteDetailsPanel() {
  return (
    <div className="flex justify-center w-full">
      <VoteDetails />
    </div>
  );
}
