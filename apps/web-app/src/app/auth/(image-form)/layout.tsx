"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useColorTheme } from "@contexts";

const getPageImage = () => {
  const { mode } = useColorTheme();
  const path = usePathname();

  switch (path) {
    case "/auth/change-password-request":
      return (
        <Image
          className="my-auto"
          src={`/assets/images/doodles/${mode}/smartphone.svg`}
          width={600}
          height={800}
          alt={"Girl using her smartphone"}
        />
      );
    case "/auth/change-password":
      return (
        <Image
          className="my-auto"
          src={`/assets/images/doodles/${mode}/plant.svg`}
          width={600}
          height={800}
          alt={"Woman holding a plant pot"}
        />
      );
    case "/auth/sign-up/with-credentials":
    case "/auth/sign-up":
      return (
        <Image
          className="my-auto"
          src={`/assets/images/doodles/${mode}/sitting-reading.svg`}
          width={600}
          height={800}
          alt={"Woman sitting and reading a book"}
        />
      );
    case "/auth/verify-account":
      return (
        <Image
          className="my-auto"
          src={`/assets/images/doodles/${mode}/reading-pajamas.svg`}
          width={600}
          height={800}
          alt={"Woman reading in pajamas"}
        />
      );
    default:
      return (
        <Image
          className="my-auto"
          src={`/assets/images/doodles/${mode}/hi.svg`}
          width={800}
          height={1000}
          alt={"Man taking a selfie and saying hi"}
        />
      );
  }
};

export default ({ children }) => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center mb-3">
      <div className="grid lg:grid-cols-2 h-full grid-cols-1 gap-x-4">
        <div className="justify-self-end my-0 hidden lg:flex">
          {getPageImage()}
        </div>
        <div className="flex flex-col lg:justify-self-start justify-self-center h-full xl:w-[60%] md:w-[70%] w-[90%]">
          {children}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
