"use client";
import { useState } from "react";
import { Input } from ".";
import { Icons } from "../icons";
import { IInputProps } from "./interface";

export const PasswordInput = ({ label, placeholder, ...rest }: IInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Input
      {...rest}
      label={label}
      type={passwordVisible ? "text" : "password"}
      placeholder={placeholder}
      tooltipExplanation="Senha deve conter ao menos 8 caracteres, com ao menos um número, uma letra maiúscula e um caracter especial, como _?#"
      icon={
        <i
          className="cursor-pointer"
          onClick={() => setPasswordVisible((c) => !c)}
        >
          {passwordVisible ? <Icons.CAN_SEE /> : <Icons.CANT_SEE />}
        </i>
      }
    />
  );
};
