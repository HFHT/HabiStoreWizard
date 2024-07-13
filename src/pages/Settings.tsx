import { Button, Flex, Text, useMantineTheme } from "@mantine/core";
import { useCloudPRNT } from "../hooks";
import { useMediaQuery } from "@mantine/hooks";

export function Settings() {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const [queueSize, doBarcodePrint, doEmpty, calibrate, alignment] = useCloudPRNT()

  return (
    <>
      <Flex gap='xs'>
        <Button size={mobile ? "xs" : "sm"} onClick={() => doEmpty()} disabled={false}>Clear Queue</Button>
        <Button size={mobile ? "xs" : "sm"} onClick={() => alignment()} disabled={false}>Adjust 1mm</Button>
        <Button size={mobile ? "xs" : "sm"} onClick={() => calibrate()} disabled={false}>Adjust 24mm</Button>
      </Flex>
      <Text>Todo: Have Web API return the size of the queue.</Text>
    </>
  );
};
