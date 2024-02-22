import React, { InputHTMLAttributes } from "react";

export interface IInputProps
  extends React.AllHTMLAttributes<InputHTMLAttributes<{}>> {
  register?: any;
  errors?: { [name: string]: { message: string } };
  icon?: React.ReactElement;
  inputLabel?: { text: string; mandatory: boolean };
  instructions?: string;
  tooltipExplanation?: string;
  hidden?: boolean;
}
