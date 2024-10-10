"use client";
import Switch from "react-switch";
import React from "react";
import { twMerge } from "tailwind-merge";

interface IToggleProps {
  checked: boolean;
  onChange: any;
}

export const Toggle = (args: IToggleProps) => {
  return (
    // <label className={twMerge("flex flex-col w-fit", className)} {...rest}>
    //   <span className="pb-3">{label}</span>
    <Switch
      {...args}
      offColor={"#aaa"}
      // onHandleColor={"text-"}
      checkedIcon={false}
      uncheckedIcon={false}
    />
    // </label>
  );
};
