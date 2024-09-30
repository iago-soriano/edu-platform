"use client";
import { useState } from "react";
import { Input } from ".";
import { Icons } from "../icons";
import { IInputProps } from "./interface";

export const PasswordInput = (props: IInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Input
      {...props}
      type={passwordVisible ? "text" : "password"}
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
