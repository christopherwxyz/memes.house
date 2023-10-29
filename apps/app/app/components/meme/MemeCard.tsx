import Image from "next/image";

export function MemeCard() {
  const votingOptions = [
    { emoji: "😂", text: "Amazing", index: 1 },
    { emoji: "😄", text: "Good", index: 2 },
    { emoji: "😐", text: "Mid", index: 3 },
    { emoji: "🙄", text: "Oof", index: 4 },
    { emoji: "😬", text: "Awful", index: 5 },
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6 w-full max-w-md">
      {/* Image Section */}
      <div className="w-full h-64 relative">
        <Image
          alt="Meme image"
          className="object-cover w-full h-full"
          height={256}
          src="https://i.imgur.com/cSZX45B.jpg"
          objectFit="cover"
          placeholder="empty" // Use placeholder prop
          width={256}
        />
      </div>
      {/* Info Section */}
      <div className="bg-black p-4 text-white">
        <h2 className="font-bold text-lg mb-2">Meme Title</h2>
        <p>
          Posted by <span className="font-semibold">username</span> on{" "}
          <span className="font-semibold">date</span>
        </p>
        {/* Rating Section */}
        <div className="flex items-center mt-2">
          <Image
            alt="Profile pic"
            className="rounded-full mr-2"
            height={40}
            src="/placeholder.svg"
            objectFit="cover"
            placeholder="empty" // Use placeholder prop
            width={40}
          />
          <p className="font-semibold">
            Current Rating: <span className="text-yellow-500">8.2/10</span>
          </p>
        </div>
      </div>
      {/* button Section */}
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {votingOptions
            .sort((a, b) => a.index - b.index)
            .map((option, index) => (
              <button
                key={index}
                className="flex flex-col items-center bg-gray-200 text-gray-700 rounded font-mono p-2"
              >
                <div className="text-2xl pb-2">{option.emoji}</div>
                <div>{option.text}</div>
              </button>
            ))}
        </div>
      </div>

      {/* Comment Section */}
      {/* TODO: Pull this in. */}
    </div>
  );
}
