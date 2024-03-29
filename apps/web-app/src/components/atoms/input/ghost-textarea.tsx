import { twMerge } from "tailwind-merge";
import React, { InputHTMLAttributes } from "react";

export function GhostTextArea(
  args: InputHTMLAttributes<{}> & { error?: string }
) {
  const { className, error, ...rest } = args;
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // useEffect(() => {
  //   if (textAreaRef && textAreaRef.current) {
  //     textAreaRef.current.style.height =
  //       textAreaRef.current.scrollHeight + "px";
  //   }
  // }, []); // TODO wft
  return (
    <>
      <textarea
        // ref={textAreaRef}
        className={twMerge(
          "block p-2 rounded w-full placeholder:txt-text2 placeholder:opacity-80 outline-none focus:shadow-outline bg-inherit",
          className,
          error && "border-error border-2"
        )}
        {...rest}
      />
      {error && <p className="text-left mt-2 mb-0 text-error">{error}</p>}
    </>
  );
}
