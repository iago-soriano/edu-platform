"use client";

import { TanstackQueryProvider, PHProvider, NextAuthProvider } from ".";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import { getServerSession } from "next-auth";
import { Toaster } from "components/ui/Toaster";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default function RootProviders({ children }) {
  return (
    <body suppressHydrationWarning className="bg-surface2 text-text1">
      <TanstackQueryProvider>
        <PHProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </PHProvider>
        <Toaster />
      </TanstackQueryProvider>
    </body>
  );
}
