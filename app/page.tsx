import Image from "next/image";
import { MemeCard } from "@/app/components/meme/MemeCard";
import { VoteDetails } from "@/app/components/vote/VoteDetails";
import ConnectButton from "./components/web3/ConnectButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="dark:bg-gray-800 p-6">
        <Header />
        <MemeGallery />
        <VoteDetailsPanel />
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" height={100} width={100} />
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

function MemeGallery() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div>
        <MemeCard />
        {/* Other meme cards... */}
      </div>
    </div>
  );
}

function VoteDetailsPanel() {
  return (
    <div className="fixed bottom-0 right-0 flex items-center justify-center z-50 mb-4 mr-4">
      <VoteDetails />
    </div>
  );
}
