import React from "react";
import { Icons } from "../icons";
import { Tooltip } from "../tooltip";
import { IInputProps } from "./interface";
import { twMerge } from "tailwind-merge";

export function Input(args: IInputProps) {
  const {
    register,
    name,
    errors,
    inputLabel,
    icon,
    placeholder,
    instructions,
    tooltipExplanation,
    hidden,
    className,
    ...rest
  } = args;
  const mandatoryTooltip = (
    <Tooltip content={"É preciso preencher para continuar"}>
      <span className="text-accent">
        {"("}&#10033;{")"}
      </span>
    </Tooltip>
  );
  const explanationTooltip = (
    <Tooltip content={tooltipExplanation}>
      <span>
        <Icons.QUESTION_CIRCLE weight="fill" />
      </span>
    </Tooltip>
  );

  return (
    <label
      className={twMerge("block relative w-fit", className)}
      style={{ display: hidden ? "none" : "block" }}
    >
      <span className="flex flex-row mb-4">
        {inputLabel?.text}{" "}
        <div className="mx-2">{inputLabel?.mandatory && mandatoryTooltip} </div>
        <div className="mx-2 flex items-center">
          {tooltipExplanation && explanationTooltip}
        </div>
      </span>
      <input
        className={twMerge(
          "block p-4 rounded w-full bg-surface3 placeholder:opacity-80 placeholder:text-text2"
        )}
        {...(register && register(name))}
        {...rest}
        placeholder={placeholder}
        // error={errors && errors[name]} // ??
      />
      <span className="absolute top-14 right-3 text-text1">{icon}</span>
      {errors && (
        <p className="text-left py-1 mt-2 mb-0 text-error">
          {errors && name && errors[name]?.message}
        </p>
      )}
    </label>
  );
}
