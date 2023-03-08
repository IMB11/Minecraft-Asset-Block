import { Button, Box } from "@primer/react";

export default function ErrorComponent(props: {
    title: string,
    message: string
}) {
    return (
        <>
            <Box p={4}>
                <Box
                    borderColor="border.default"
                    borderWidth={1}
                    borderStyle="solid"
                    borderRadius={6}
                    overflow="hidden"
                >
                    <Box
                        bg="canvas.subtle"
                        p={3}
                        borderBottomWidth={1}
                        borderBottomStyle="solid"
                        borderColor="border.default"
                    >
                        {props.title}
                    </Box>

                    <Box p={4}>
                        <pre className="mt-3 p-3">{props.message}</pre>
                    </Box>
                </Box>
            </Box>
        </>
    )
}