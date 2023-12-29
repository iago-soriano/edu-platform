import { Navbar, Toast } from "@components";
import {
  ThemeProvider,
  AuthProvider,
  TanstackQueryProvider,
  NextAuthProvider,
  PHProvider,
} from "@contexts";
import { getToken } from "next-auth/jwt";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import StyledJsxRegistry from "../styles/styled-components-registry";
import { ThemedHtml } from "./_themed_html";
import { cookies } from "next/headers";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { axios, getServerSession } from "@infrastructure";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default async function RootLayout(context) {
  const serverSession = await getServerSession();

  return (
    <StyledJsxRegistry>
      <ThemeProvider>
        <ThemedHtml>
          <body suppressHydrationWarning className="bg-surface2 text-text1">
            <TanstackQueryProvider>
              <PHProvider>
                <NextAuthProvider session={serverSession}>
                  <AuthProvider>
                    <Navbar />
                    {context.children}
                  </AuthProvider>
                </NextAuthProvider>
              </PHProvider>
              <Toast />
            </TanstackQueryProvider>
          </body>
        </ThemedHtml>
      </ThemeProvider>
    </StyledJsxRegistry>
  );
}
