import { Button, Text } from "@mantine/core";
import { useCloudPRNT } from "../hooks";

export function Settings() {
  const [queueSize, doBarcodePrint, doEmpty, calibrate, alignment] = useCloudPRNT()

  return (
    <div>
      <Button onClick={() => doEmpty()} disabled={false}>Clear Queue</Button>
      <Button onClick={() => alignment()} disabled={false}>Adjust 1mm</Button>
      <Button onClick={() => calibrate()} disabled={false}>Adjust 24mm</Button>
      <Text>Todo: Have Web API return the size of the queue.</Text>
    </div>
  );
};
