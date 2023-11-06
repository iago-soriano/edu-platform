import React from "react";
import { Tooltip, Icons } from "@components";
import {
  InputStyled,
  ErrorMessageContainer,
  InputLabelStyled,
  InstructionsContainer,
  InputIconContainer,
  LabelStyled,
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
      <LabelStyled>
        {inputLabel?.text} {inputLabel?.mandatory && mandatoryTooltip}{" "}
        {tooltipExplanation && explanationTooltip}
      </LabelStyled>
      <InputStyled
        {...(register && register(name))}
        {...rest}
        placeholder={placeholder}
        error={errors && errors[name]}
      />
      <InputIconContainer>{icon}</InputIconContainer>
      {instructions && (
        <InstructionsContainer>{instructions}</InstructionsContainer>
      )}
      {errors && (
        <ErrorMessageContainer>
          {errors && errors[name]?.message}
        </ErrorMessageContainer>
      )}
    </InputLabelStyled>
  );
}
