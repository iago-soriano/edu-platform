"use client";
import { Footer } from "@components";
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
    case "/auth/sign-up/credentials":
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
    <div className="relative min-h-[90vh] flex flex-col justify-center">
      <div className="grid lg:grid-cols-[2fr_3fr] h-full grid-cols-1">
        <div className="justify-self-end my-0 hidden lg:flex">
          {getPageImage()}
        </div>
        <div className="flex flex-col justify-center align-center h-full lg:py-20 py-5 my-0 mx-auto xl:w-[50%] md:w-[70%] w-[90%]">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
