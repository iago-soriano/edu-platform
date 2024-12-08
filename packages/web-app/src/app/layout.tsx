// import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { Navbar } from "@components/ui/navbar";
import { Footer } from "components/ui/footer";
import RootProviders from "contexts/providers";
import { Suspense } from "react";
import { Spinner } from "@components/ui/spinner";

export default function RootLayout(context) {
  return (
    <RootProviders>
      <Navbar />
      <main className="min-h-[90vh] w-full mt-[4rem]">
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
  );
}
