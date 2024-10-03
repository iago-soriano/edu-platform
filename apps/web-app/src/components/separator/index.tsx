export const Separator = ({ children }) => (
  <div className="after:ml-1 before:mr-1 text-text1 flex items-center text-center w-full my-5 mx-0 before:flex-1 before:border-b-[1px] before:border-b-text1 before:border-solid after:flex-1 after:border-b-[1px] after:border-b-text1 after:border-solid">
    {children}
  </div>
);

export const VerticalSeparator = () => (
  <div className="h-full ml-2 border-l border-solid border-text1" />
);
