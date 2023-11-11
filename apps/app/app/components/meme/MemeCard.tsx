import Image from "next/image";
import { baseGoerli } from 'viem/chains'
import { useContractRead, useContractReads } from 'wagmi'
import { contract } from '@/app/lib/contract'
import { getRelativeDate } from "@/app/lib/utils";

import { Avatar, Badge, Box, Container, Em, Flex, Separator, Text } from "@radix-ui/themes";

interface MarketData {
  0: number;
  1: {
    mean: bigint;
    standardDeviation: bigint;
    sumOfSquaredVotes: bigint;
    sumOfVotes: bigint;
    totalStake: bigint;
    totalVoters: bigint;
    voterAddresses: any[]; // You can replace 'any[]' with a more specific type if needed
    votingEndTime: bigint;
    votingEnded: boolean;
  };
}


export function MemeCard() {
  const { data: data }: { data: MarketData | undefined } = useContractRead({
    ...contract,
    chainId: baseGoerli.id,
    functionName: 'getMarketState',
    args: ["0x9c2b59e75b5a6a61f2e584d79e5a26866cd0fa0b"]
  })

  const votingEndsDate = data ? getRelativeDate(Number(data[1].votingEndTime)) : null;

  return (
    <div className="w-fit overflow-hidden rounded-md">
      <Box height="auto">
        <Container size={"4"}>
          <Image
            src="https://images.unsplash.com/photo-1479030160180-b1860951d696"
            alt="A house in a forest"
            height={"1600"}
            width={"800"}
            objectFit="cover"
          />
          <Separator my="3" size="4" />
          <Flex justify="between" gap={"3"} direction={"row"}>
            <Box
              style={{ backgroundColor: 'var(--dark)', borderRadius: 'var(--radius-3)', borderColor: 'var(--gray)' }}>
              <Text>
                <Avatar size={"2"} src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" fallback="MH" />
                <Text size="2" weight="regular" className="pl-3">
                  <Em>
                    @christopherw.eth
                  </Em>
                </Text>
              </Text>
            </Box>
            <Box right="auto">
              <Badge className="m-2" color="green">
                <Text size="2" weight="bold">
                  End Date: {votingEndsDate || 'Loading...'}
                </Text>
              </Badge>
            </Box>
          </Flex>
        </Container>
      </Box>
    </div>
  );
}
