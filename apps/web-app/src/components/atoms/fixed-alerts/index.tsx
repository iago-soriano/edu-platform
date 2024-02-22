export const ErrorAlert = ({ children }) => (
  <div className="w-full border-red-500 border-2 text-red-500 p-4 my-3 mx-0 font-bold">
    {children}
  </div>
);
export const SuccessAlert = ({ children }) => (
  <div className="w-full border-green-500 border-2 text-green-500 p-4 my-3 mx-0 font-bold">
    {children}
  </div>
);
