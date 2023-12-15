import { usePathname } from "next/navigation";
import { useColorTheme } from "@contexts";
import Image from "next/image";

export const PageImage = () => {
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
