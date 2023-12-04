import { IInputProps } from "./interface";
import { twMerge } from "tailwind-merge";
import React, { InputHTMLAttributes } from "react";

export function GhostInput(args: InputHTMLAttributes<{}> & { error?: string }) {
  const { className, error, ...rest } = args;
  return (
    <>
      <input
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
