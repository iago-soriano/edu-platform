import Image from "next/image";
import { Footer } from "@components";

export default ({ children }) => {
  return (
    <div className="relative min-h-[90vh]">
      <div className="grid lg:grid-cols-[1fr_2fr] h-full grid-cols-1">
        <div className="p-14 my-0 mx-auto hidden lg:flex">
          <Image
            className="my-auto"
            src="https://picsum.photos/400/600"
            width={400}
            height={600}
            alt="Picture of the author"
          />
        </div>
        <div className="flex flex-col justify-center align-center h-full lg:py-20 py-5 my-0 mx-auto xl:w-[50%] md:w-[70%] w-[90%]">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
