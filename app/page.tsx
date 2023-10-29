import Image from "next/image";
import { MemeCard } from "@/app/components/meme/MemeCard";
import { VoteDetails } from "@/app/components/vote/VoteDetails";
import ConnectButton from "@/app/components/web3/ConnectButton";
import CanvasBackground from "@/app/components/ui/CanvasBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen p-24">
      <CanvasBackground />
      <Header />
      <main className="flex flex-1 dark:bg-gray-800 p-6 mt-16">  {/* Added mt-16 to compensate for the fixed header */}
        <div className="flex-1 flex flex-col">
          <MemeGallery />
          <VoteDetailsPanel />
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between p-3 z-10 bg-opacity-75 backdrop-blur-md">
      <div>
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" height={60} width={60} />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}

function MemeGallery() {
  return (
    <div className="flex justify-center w-full mb-6">
      <MemeCard />
      {/* Other meme cards... */}
    </div>
  );
}

function VoteDetailsPanel() {
  return (
    <div className="flex justify-center w-full mb-6">
      <VoteDetails />
    </div>
  );
}
