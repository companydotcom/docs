import { UiProvider, extendTheme } from "@vastly/ui";

export const theme = extendTheme();

export default function App({ Component, pageProps }) {
  return (
    <UiProvider theme={theme}>
      <Component {...pageProps} />
    </UiProvider>
  );
}
