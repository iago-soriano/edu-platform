import { twMerge } from "tailwind-merge";
import React from "react";

interface IRadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  selected: boolean;
  text: string;
  subText?: string;
}
export const RadioButton = ({
  selected,
  text,
  subText,
  value,
  onChange, //   ...rest
  name,
}: IRadioButtonProps) => {
  return (
    <label
      className={twMerge(
        "flex flex-row items-center p-1 rounded hover:bg-muted"
      )}
    >
      <input
        onChange={onChange}
        className="mx-2"
        type="radio"
        defaultValue={value}
        checked={selected}
      />
      <span className="p-2">{text}</span>
      <span className="text-muted-foreground pr-3">{subText}</span>
    </label>
  );
};

interface IRadioGroupProps {
  onChange?: any;
  value: any;
  options: {
    text: string;
    subText?: string;
    value: any;
  }[];
}

export const RadioGroup = ({ onChange, value, options }: IRadioGroupProps) => {
  return options.map((opt, i) => {
    return (
      <RadioButton
        key={i}
        {...opt}
        selected={opt.value?.toString() === value?.toString()}
        onChange={onChange}
      />
    );
  });
};
