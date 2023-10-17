import Image from "next/image";

export function MemeCard() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6 w-full max-w-md">
      {/* Image Section */}
      <div className="relative w-full" style={{ paddingTop: "100%" }}>
        <Image
          alt="Meme image"
          className="absolute top-0 left-0 w-full h-auto"
          height={500}
          src="/placeholder.png"
          objectFit="cover"
          placeholder="empty" // Use placeholder prop
          width={500}
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
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <button className="flex-1">Super Funny</button>
            <button className="flex-1">Funny</button>
            <button className="flex-1">Mid</button>
            <button className="flex-1">Not Funny</button>
            <button className="flex-1">Really Not</button>
          </div>
        </div>
      </div>
    </div>
  );
}
