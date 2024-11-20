// import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { Navbar } from "@components/ui/navbar";
import { Footer } from "components/ui/footer";
import RootProviders from "contexts/providers";
import { Suspense } from "react";
import { Spinner } from "@components/ui/spinner";

export const metadata = {
  title: "Edu Platform",
  description: "Uma plataforma para professores de idiomas",
  referrer: "no-referrer-when-downgrade",
};

export default function RootLayout(context) {
  return (
    <RootProviders>
      <Navbar />
      <main className="min-h-[90vh] px-7 py-2 mt-20 flex justify-center">
        <Suspense
          fallback={
            <div className="h-full flex flex-col items-center justify-center">
              <Spinner className="w-32 h-32" />
            </div>
          }
        >
          {context.children}
        </Suspense>
      </main>
      <Footer />
    </RootProviders>
    // </ErrorBoundary>
  );
}
