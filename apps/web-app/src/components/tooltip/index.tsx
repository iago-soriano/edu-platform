export const Tooltip = ({ content, children }) => {
  return (
    <div className="group relative flex justify-center">
      <span className="absolute bottom-7 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 w-max max-w-[300px]">
        {content}
      </span>
      {children}
    </div>
  );
};
