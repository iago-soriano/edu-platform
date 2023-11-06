import Image from "next/image";
import { Footer } from "@components";

export default ({ children }) => {
  return (
    <>
      <div className="grid bg-bkg lg:grid-cols-[1fr_2fr] min-h-[80%] h-auto grid-cols-1">
        <div className="p-14 my-0 mx-auto hidden lg:block">
          <Image
            src="https://picsum.photos/400/600"
            width={400}
            height={600}
            alt="Picture of the author"
          />
        </div>
        <div className="flex flex-col justify-between h-full lg:py-20 py-5 my-0 mx-auto xl:w-[50%] w-[90%] lg:w-[70%]">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};
