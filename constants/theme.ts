import { extendTheme, ThemeConfig } from "@vastly/ui"

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true
}

export const theme = extendTheme({
  config
})
