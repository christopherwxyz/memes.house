import { Box, Container } from "@radix-ui/themes";
import Image from "next/image";

export function MemeImage() {
    return (
        <div className="w-fit overflow-hidden rounded-md">
            <Box height="auto">
                <Container display="block">
                    <Image
                        src="https://images.unsplash.com/photo-1479030160180-b1860951d696"
                        alt="A house in a forest"
                        height={"1600"}
                        width={"800"}
                        objectFit="cover"
                    />
                </Container>
            </Box>
        </div>
    )
}