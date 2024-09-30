import React, { InputHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "./variants";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  register?: any;
  errors?: { [name: string]: { message: string } };
  error?: string;
  icon?: React.ReactElement;
  inputLabel?: { text: string; mandatory: boolean };
  instructions?: string;
  tooltipExplanation?: string;
  hidden?: boolean;
}
