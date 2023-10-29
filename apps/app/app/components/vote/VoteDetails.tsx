import Image from "next/image";
// File: components/voting/VoteDetails.tsx
export function VoteDetails() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Vote Details</h2>
      {/* Chart Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Image
          alt="Distribution of votes"
          className="w-full h-auto"
          height="300"
          src="/placeholder.png"
          style={{ aspectRatio: "500/300", objectFit: "cover" }}
          width="500"
        />
        {/* Info Section */}
        <div className="p-4 text-black bg-white font-mono">
          <p>
            Time Remaining:{" "}
            <span className="font-semibold">3 hours 22 minutes</span>
          </p>
          <p>
            Total Staked: <span className="font-semibold">500 ETH</span>
          </p>
        </div>
      </div>
      {/* Voters Section */}
      <div className="mt-4 overflow-auto max-h-[400px]">
        <h3 className="font-bold mb-2">Voters:</h3>
        <div className="flex flex-wrap gap-2">{/* ... voter info */}</div>
      </div>
    </div>
  );
}
