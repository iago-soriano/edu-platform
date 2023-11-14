// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

export const Tooltip = ({ content, children }) => {
  // return <Tippy content={content}>{children}</Tippy> || { children };
  return (
    <div className="group relative flex justify-center">
      <span className="absolute bottom-7 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {content}
      </span>
      {children}
    </div>
  );
  // return children;
};
