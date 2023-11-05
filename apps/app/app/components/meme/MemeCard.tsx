import Image from "next/image";
import { AspectRatio, Badge, Box, Container } from "@radix-ui/themes";

export function MemeCard() {
  return (
    <>
          <AspectRatio ratio={16 / 8}>
            <Image
              src="https://images.unsplash.com/photo-1479030160180-b1860951d696"
              alt="A house in a forest"
              height={"1600"}
              width={"800"}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-2)',
              }}
            />
          </AspectRatio>
    </>
  );
}
