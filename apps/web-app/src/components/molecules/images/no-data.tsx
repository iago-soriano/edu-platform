import Image from "next/image";
import { useColorTheme } from "@contexts";

export const NoDataCard = () => {
  const { mode } = useColorTheme();

  return (
    <div>
      <p className="py-5 text-center">There is no data to show at the moment</p>
      <Image
        className="my-auto"
        src={`/assets/images/doodles/${mode}/smartphone.svg`}
        width={600}
        height={800}
        alt={"Cartoon of a girl using a smartphone"}
      />
    </div>
  );
};
