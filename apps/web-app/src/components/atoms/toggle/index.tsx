"use client";
import Switch from "react-switch";
import { useColorTheme } from "@contexts";
import React from "react";
import { twMerge } from "tailwind-merge";

interface IToggleProps {
  checked: boolean;
  onChange: any;
}

export const Toggle = (args: IToggleProps) => {
  const { theme } = useColorTheme();

  return (
    // <label className={twMerge("flex flex-col w-fit", className)} {...rest}>
    //   <span className="pb-3">{label}</span>
    <Switch
      {...args}
      offColor={"#aaa"}
      onColor={theme.colors.secondary}
      // onHandleColor={"text-"}
      offHandleColor={theme.colors.text}
      checkedIcon={false}
      uncheckedIcon={false}
    />
    // </label>
  );
};
