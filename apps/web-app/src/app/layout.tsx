import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";

import { Navbar } from "components/navbar";
import { Footer } from "components/footer";
import RootProviders from "contexts/providers";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default function RootLayout(context) {
  return (
    <RootProviders>
      <html lang="pt-BR">
        <body suppressHydrationWarning className="bg-surface2 text-text1">
          <Navbar />
          <main className="min-h-[87vh] px-7 py-2">{context.children}</main>
          <Footer />
        </body>
      </html>
    </RootProviders>
  );
}
