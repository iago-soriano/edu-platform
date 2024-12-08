import Image from "next/image";

export const FeatureText = () => (
  <div className="justify-self-center w-[70%] flex flex-col items-center">
    <span></span>
    <p>Nome da feature pipipipopopo</p>
  </div>
);

export const Step = ({ title, description, imageSrc }) => {
  return (
    <div className="flex items-center justify-center md:flex-col flex-row w-[210px]">
      <Image src={imageSrc} alt={imageSrc} width={200} height={400} />
      <h3>{title}</h3>
      <p className="w-full whitespace-break-spaces">{description}</p>
    </div>
  );
};
