import { Step } from "app/home/components";

export const BenefitsCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row justify-around items-start">
      <div className="flex gap-5 px-5 flex-col items-center justify-center md:flex-col w-[100%]">
        <span className="text-primary">{icon}</span>
        <h3 className="text-2xl text-primary font-semibold">{title}</h3>
        {/* <p className=" whitespace-break-spaces">{description}</p> */}
        <p className="w-full whitespace-break-spaces text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
