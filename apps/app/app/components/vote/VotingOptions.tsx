import { Container, Flex } from "@radix-ui/themes";

export default function VotingOptions() {
    return (
        <Container m="1" display="block">
            <Flex className="flex-col items-center space-y-4" direction="column" align="center" gap="4">
                <Flex className="justify-center space-x-4" justify="center" gap="2">
                    {/* Emoji Buttons */}
                    <EmojiButton emoji="😂" label="Hilarious" ringColor="green" />
                    <EmojiButton emoji="😄" label="Funny" ringColor="blue" />
                    <EmojiButton emoji="😐" label="Neutral" ringColor="yellow" />
                    <EmojiButton emoji="😒" label="Not Funny" ringColor="purple" />
                    <EmojiButton emoji="😠" label="Very Unfunny" ringColor="red" />
                </Flex>
            </Flex>
        </Container>
    );
}

const ringColorClasses: { [key: string]: string } = {
    green: 'ring-green-200 hover:ring-green-400 hover:bg-green-500',
    yellow: 'ring-yellow-200 hover:ring-yellow-400 hover:bg-yellow-500',
    blue: 'ring-blue-200 hover:ring-blue-400 hover:bg-blue-500',
    purple: 'ring-purple-200 hover:ring-purple-400 hover:bg-purple-500',
    red: 'ring-red-200 hover:ring-red-400 hover:bg-red-500',
};

function EmojiButton({ emoji, label, ringColor }: { emoji: string; label: string; ringColor: string }) {
    // Use the mapping object to get the correct class names
    const ringClass = `${ringColorClasses[ringColor]} ring-4 ring-opacity-50 hover:ring-opacity-75`;

    return (
        <div className="flex flex-col items-center">
            <button
                className={`transition-all duration-300 ease-in-out text-4xl rounded-full w-14 h-14 flex items-center justify-center ${ringClass}`}
                aria-label={label}
            >
                {emoji}
            </button>
        </div>
    );
}