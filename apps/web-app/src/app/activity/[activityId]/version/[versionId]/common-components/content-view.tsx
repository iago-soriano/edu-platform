export const DescriptionView = ({ description }) => (
  <p className="text-text2">{description}</p>
);

export const TitleView = ({ title }) => (
  <h4 className="text-xl leading-10 font-bold">{title}</h4>
);

export const ContentContainer = ({ children }) => (
  <div className="lg:col-start-3 lg:col-span-6 sm:col-start-2 sm:col-span-8 col-start-2 col-span-14">
    {children}
  </div>
);

export const ImageView = ({ src }) => (
  <div
    className={`w-[550px] h-[550px] flex justify-center items-center mx-auto my-3`}
  >
    <img src={src} className="max-w-[550px] max-h-[550px]" />
  </div>
);
