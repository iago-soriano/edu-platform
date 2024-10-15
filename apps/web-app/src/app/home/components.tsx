import Image from "next/image";

export const FeatureSection = ({ children, ...props }) => (
  <section
    {...props}
    className="grid lg:grid-cols-2 grid-cols-1 items-center w-full min-h-[80vh]"
  >
    {children}
  </section>
);

export const FeatureImage = ({ src }) => {
  const size = 500;
  return (
    <div className="flex justify-center items-center lg:order-none order-last">
      <Image
        src={`https://picsum.photos/${size}/${size}`}
        alt="imagem"
        width={size}
        height={size}
        className="h-[500px]"
      />
    </div>
  );
};

export const FeatureTextContainer = ({ children }) => (
  <div className="justify-self-center w-[70%] flex flex-col items-center">
    {children}
  </div>
);

export const Step = ({ title, description, imageSrc }) => {
  return (
    <div className="flex md:flex-col flex-row w-[210px]">
      <h3>{title}</h3>
      <p className="w-full whitespace-break-spaces">{description}</p>
      <Image src={imageSrc} alt={imageSrc} width={200} height={400} />
    </div>
  );
};
