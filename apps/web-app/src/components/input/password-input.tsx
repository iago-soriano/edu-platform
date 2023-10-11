import { useState } from "react";
import { Icons, Input } from "@components";
import { InputIcon } from './icon'; 
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
        <InputIcon
          onClick={() => setPasswordVisible((c) => !c)}
          icon={passwordVisible ? <Icons.CAN_SEE /> : <Icons.CANT_SEE />}
          
        />
      }
    />
  );
};
