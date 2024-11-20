import { Step } from "app/home/components";

export const BenefitsCard = ({ icon, title, description }) => {
  return (
    <div className="h-[100%] flex flex-row justify-around items-start lg:w-[70%] w-[90%] my-5 mx-auto md:flex-row md:[&>:nth-child(even)>img]:order-none [&>:nth-child(even)>img]:order-first">
      <div className="flex gap-5 px-5 flex-col items-center justify-center md:flex-col w-[100%]">
        <span className="text-[#c2470a]">{icon}</span>
        <h3 className="text-2xl text-[#c2470a] font-semibold">{title}</h3>
        {/* <p className=" whitespace-break-spaces">{description}</p> */}
        <p className="w-full whitespace-break-spaces text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          minus soluta beatae commodi rerum incidunt nobis sit et perspiciatis
          temporibus quas, quaerat consectetur vel? Accusamus error ratione nam
          autem magnam?
        </p>
      </div>
    </div>
  );
};
