"use client";

import { QueryClientProvider, PHProvider, NextAuthProvider } from ".";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "components/ui/Toaster";
import { Roboto_Slab, Mulish } from "next/font/google";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

const roboto = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

const mulish = Mulish({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mulish",
});

export default function RootProviders({ children }) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${mulish.variable}`}>
      <body suppressHydrationWarning>
        <QueryClientProvider>
          <PHProvider>
            <NextAuthProvider>{children}</NextAuthProvider>
          </PHProvider>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
