// import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import { Navbar } from "@components/ui/Navbar copy";
import { Footer } from "components/ui/footer";
import RootProviders from "contexts/providers";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default function RootLayout(context) {
  return (
    <RootProviders>
      <Navbar />
      <main className="min-h-[87vh] px-7 py-2">{context.children}</main>
      <Footer />
    </RootProviders>
  );
}
