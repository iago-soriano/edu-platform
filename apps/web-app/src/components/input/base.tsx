import React from "react";
import { Tooltip, Icons } from "@components";
import {
  InputStyled,
  ErrorMessageContainer,
  InputLabelStyled,
  InputIconContainer,
} from "./styles";
import { IInputProps } from "./interface";

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
    ...rest
  } = args;
  const mandatoryTooltip = (
    <Tooltip content={"É preciso preencher para continuar"}>
      {"("}
      <span className="text-red-500">&#10033;</span>
      {")"}
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
    <InputLabelStyled style={{ display: hidden ? "none" : "block" }}>
      <span className="font-bold flex flex-row mb-4">
        {inputLabel?.text}{" "}
        <div className="mx-2">{inputLabel?.mandatory && mandatoryTooltip} </div>
        <div className="mx-2 flex items-center">
          {tooltipExplanation && explanationTooltip}
        </div>
      </span>
      <InputStyled
        {...(register && register(name))}
        {...rest}
        placeholder={placeholder}
        error={errors && errors[name]}
      />
      <span className="absolute top-14 right-3">{icon}</span>
      {errors && (
        <ErrorMessageContainer>
          {errors && errors[name]?.message}
        </ErrorMessageContainer>
      )}
    </InputLabelStyled>
  );
}
