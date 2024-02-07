import Image from "next/image";

export const FeatureSection = ({ children }) => (
  <section className="grid lg:grid-cols-2 grid-cols-1 items-center w-full min-h-[80vh] bg-surface3">
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
  <div className="justify-self-center w-[70%] flex flex-col lg:items-start items-center">
    {children}
  </div>
);

export const Step = ({ title, description, imageSrc }) => {
  return (
    <div className="flex md:flex-col flex-row">
      <h3>{title}</h3>
      <p>{description}</p>
      <Image src={imageSrc} alt={imageSrc} width={200} height={400} />
    </div>
  );
};
