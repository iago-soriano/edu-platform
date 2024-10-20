// import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import { Navbar } from "@components/ui/navbar";
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
      <main className="min-h-screen px-7 py-2 mt-20">{context.children}</main>
      <Footer />
    </RootProviders>
  );
}
