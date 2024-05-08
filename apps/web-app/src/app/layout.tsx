import { Navbar, Toast } from "@components";
import {
  ThemeProvider,
  TanstackQueryProvider,
  PHProvider,
  NextAuthProvider,
} from "@contexts";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "../styles/global.css";
import { ThemedHtml } from "./_themed_html";
import { getServerSession } from "@infrastructure";
import { Footer } from "@components";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default async function RootLayout(context) {
  const serverSession = await getServerSession();

  return (
    <ThemeProvider>
      <ThemedHtml>
        <body suppressHydrationWarning className="bg-surface2 text-text1">
          <TanstackQueryProvider>
            <PHProvider>
              <NextAuthProvider session={serverSession}>
                <Navbar />
                <main className="min-h-[87vh] px-7 py-2">
                  {context.children}
                </main>
                <Footer />
              </NextAuthProvider>
            </PHProvider>
            <Toast />
          </TanstackQueryProvider>
        </body>
      </ThemedHtml>
    </ThemeProvider>
  );
}
