import 'reflect-metadata';
import { ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { NotificationsProvider } from '@mantine/notifications';
import {useColorScheme} from "@mantine/hooks"
import 'reactflow/dist/style.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => {

    const colorScheme = useColorScheme('dark', {
      getInitialValueInEffect: false
    })

    return <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        colorScheme: colorScheme,
        fontFamily: "monospace"
      }}
    >
      <NotificationsProvider>
        <ColorSchemeProvider colorScheme={colorScheme}>
          <Story />
        </ColorSchemeProvider>
      </NotificationsProvider>
    </MantineProvider>
  }
];