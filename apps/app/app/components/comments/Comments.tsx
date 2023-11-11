import { Box, Container, Em, Text } from "@radix-ui/themes";

export function Comments() {
    return (
        <>
            <Container size="3">
                <Box
                    p="4"
                    style={{ backgroundColor: 'var(--dark)', borderRadius: 'var(--radius-3)' }}
                >
                    <Text>
                        <Em></Em>
                    </Text>
                </Box>
            </Container>
        </>
    )
}