import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import './App.css';
import { useOnline, useParams } from './hooks';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Box, Flex, LoadingOverlay, Text } from '@mantine/core';
import RouterSwitcher from './RouterSwitcher';
import { Header, Navbar } from './components';

export function App({ collections }: any) {

  const isOnline = useOnline({
    online: [() => { notifications.show({ color: 'green', title: '🛜 Network Restored', message: 'You are back online! ' }) }],
    offline: [() => { notifications.show({ color: 'red', title: '❗ Network Error', message: 'Connection to the network has been lost! ' }) }]
  });
  const params = useParams(['nosave', 'noprint'])

  const [opened, { toggle }] = useDisclosure();

  return (
    <div className="App" >
      <AppShell
        header={{ height: 55 }}
        navbar={{ width: 120, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="sm"
      >
        <Header toggle={toggle} opened={opened} />
        <Navbar />
        <AppShell.Main>
          <Notifications position="top-right" />
          <Box pos='relative'>
            <LoadingOverlay visible={!isOnline} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ size: 'xl', color: 'pink', type: 'bars' }} />
            <RouterSwitcher collections={collections} />
          </Box>
        </AppShell.Main>
        <AppShell.Footer zIndex={opened ? 'auto' : 201}>
          <Flex justify="center">
            <Text size="xs">Copyright<span>&copy;</span> Habitat for Humanity Tucson 2024</Text>
          </Flex>
        </AppShell.Footer>
      </AppShell>
    </div>
  );

}
