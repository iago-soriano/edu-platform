import { Spinner } from "../spinner";

export const Loading = ({ show }) => {
  return (
    <div
      data-state={show && "show"}
      className="
        transition-[background-opacity] fixed top-0 left-0 h-0 w-[100vw] flex justify-center items-center z-50 bg-opacity-0 bg-black 
        data-[state=show]:h-[100vh] data-[state=show]:bg-opacity-40
      "
    >
      {show && <Spinner className="w-14" />}
    </div>
  );
};
