import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import GlobalStyle from '../../../../components/globalstyles'
import { Navbar, Toast } from "@components";

const theme: DefaultTheme = {
  primary: "#ECFDFD",
  secondary: "#D8E2E9",
  accent: "#E94560",
  text: "#16213E",
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <Component {...pageProps} />
        <Toast />
      </ThemeProvider>
    </>
  )
}
