import { Footer, PageImage } from "@components";

export default ({ children }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center">
      <div className="grid lg:grid-cols-[2fr_3fr] h-full grid-cols-1">
        <div className="justify-self-end my-0 hidden lg:flex">
          <PageImage />
        </div>
        <div className="flex flex-col justify-center align-center h-full lg:py-20 py-5 my-0 mx-auto xl:w-[50%] md:w-[70%] w-[90%]">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
