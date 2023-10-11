import type { AppProps } from 'next/app'
import { Navbar, GlobalStyle, Toast } from "@components";
import { ThemeProvider, AuthProvider } from '@contexts';
import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthProvider>
          <ThemeProvider >
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <GlobalStyle />
            <Navbar />
            <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </SessionProvider>
      <Toast />
    </QueryClientProvider>
  )
}
