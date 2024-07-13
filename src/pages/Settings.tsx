import { Button, Flex, Text } from "@mantine/core";
import { useCloudPRNT } from "../hooks";

export function Settings() {
  const [queueSize, doBarcodePrint, doEmpty, calibrate, alignment] = useCloudPRNT()

  return (
    <>
      <Flex gap='xs'>
        <Button className='buttontext' onClick={() => doEmpty()} disabled={false}>Clear Queue</Button>
        <Button className='buttontext' onClick={() => alignment()} disabled={false}>Adjust 1mm</Button>
        <Button className='buttontext' onClick={() => calibrate()} disabled={false}>Adjust 24mm</Button>
      </Flex>
      <Text>Todo: Have Web API return the size of the queue.</Text>
    </>
  );
};
