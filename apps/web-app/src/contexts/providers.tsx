"use client";

import { QueryClientProvider, PHProvider, NextAuthProvider } from ".";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "components/ui/Toaster";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default function RootProviders({ children }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="bg-surface2 text-text1">
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
