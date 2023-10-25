"use client";
import Switch from "react-switch";
import { useColorTheme } from "@contexts";

export const Toggle = ({ checked, onChange, label }) => {
  const { theme } = useColorTheme();

  return (
    <>
      <label className="flex flex-col">
        <span className="pb-3">{label}</span>
        <Switch
          onChange={onChange}
          checked={checked}
          offColor={"#aaa"}
          onColor={theme.colors.secondary}
          onHandleColor={theme.colors.text}
          offHandleColor={theme.colors.text}
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </label>
    </>
  );
};
