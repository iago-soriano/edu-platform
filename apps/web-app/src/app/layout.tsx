import { Navbar, Toast } from "@components";
import {
  ThemeProvider,
  AuthProvider,
  TanstackQueryProvider,
  NextAuthProvider,
  useColorTheme,
} from "@contexts";
import { getServerSession } from "next-auth";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import StyledJsxRegistry from "../styles/styled-components-registry";
import { ThemedHtml } from "./_themed_html";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverSession = await getServerSession();
  return (
    <StyledJsxRegistry>
      <ThemeProvider>
        <ThemedHtml>
          <body suppressHydrationWarning className="bg-surface2 text-text1">
            <TanstackQueryProvider>
              <NextAuthProvider session={serverSession}>
                <AuthProvider>
                  <Navbar />
                  {children}
                </AuthProvider>
              </NextAuthProvider>
              <Toast />
            </TanstackQueryProvider>
          </body>
        </ThemedHtml>
      </ThemeProvider>
    </StyledJsxRegistry>
  );
}
