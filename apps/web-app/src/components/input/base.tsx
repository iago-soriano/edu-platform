import React from "react";
import { Tooltip, QuestionTooltip } from "@components";
import { 
  InputStyled, 
  ErrorMessageContainer, 
  InputLabelStyled, 
  InstructionsContainer,
  InputIconContainer,
  LabelStyled
} from "./styles";
import { IInputProps } from "./interface";

export function Input(args: IInputProps) {
  const { register, name, errors, inputLabel, icon, placeholder, instructions, tooltipExplanation, ...rest } = args;
  const mandatoryTooltip = <Tooltip content={"É preciso preencher para continuar"}>{"("}<span style={{ color: 'red'}}>&#10033;</span>{")"}</Tooltip>;
  const explanationTooltip = <QuestionTooltip content={tooltipExplanation} />

  return (
    <InputLabelStyled>
      <LabelStyled>
        {inputLabel.text} {inputLabel.mandatory && mandatoryTooltip} {tooltipExplanation && explanationTooltip}
      </LabelStyled>
      <InputStyled
        {...(register && register(name))}
        {...rest}
        placeholder={placeholder}
        error={errors && errors[name]}
      />
      <InputIconContainer>
        {icon}
      </InputIconContainer>
      {instructions && 
        <InstructionsContainer>
          {instructions}
        </InstructionsContainer>
      }
      {errors && (
        <ErrorMessageContainer>
          {errors && errors[name]?.message}
        </ErrorMessageContainer>
      )}
    </InputLabelStyled>
  );
}
