import { ColorModeScript } from "@vastly/ui";
import { Html, Head, Main, NextScript } from "next/document";
import { theme } from "./_app";

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
