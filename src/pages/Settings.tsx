import { Button, Flex, Text, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useCloudPRNT } from "../hooks";
import { useMediaQuery } from "@mantine/hooks";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export function Settings() {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const [doEmpty, calibrate, alignment] = useCloudPRNT()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light')
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <>
      <Flex gap='xs'>
        <Button size={mobile ? "xs" : "sm"} onClick={() => doEmpty()} disabled={false}>Clear Queue</Button>
        <Button size={mobile ? "xs" : "sm"} onClick={() => alignment()} disabled={false}>Adjust 1mm</Button>
        <Button size={mobile ? "xs" : "sm"} onClick={() => calibrate()} disabled={false}>Adjust 24mm</Button>
      </Flex>
      <Flex gap='xs' mt='lg'>
        <Button size={mobile ? "xs" : "sm"} variant="link" onClick={toggleColorScheme}>
          {computedColorScheme === 'dark' ? <IconSunFilled /> : <IconMoonFilled />}
        </Button>
      </Flex>

      <Text>Todo: Have Web API return the size of the queue.</Text>
    </>
  );
};
