import Image from "next/image";
import { useColorTheme } from "@contexts";

export const ErrorCard = ({ message }) => {
  const { mode } = useColorTheme();

  return (
    <div>
      <p className="py-5 text-center">{message}</p>
      <Image
        className="my-auto"
        src={`/assets/images/doodles/${mode}/messy.svg`}
        width={600}
        height={800}
        alt={"Cartoon of a man dropping his papers"}
      />
    </div>
  );
};
