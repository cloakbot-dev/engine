import { ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { useColorScheme } from "@mantine/hooks"

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
      <ColorSchemeProvider colorScheme={colorScheme}>
      <Story /></ColorSchemeProvider>
  </MantineProvider>}
]