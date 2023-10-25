"use client";
import { Toggle } from "@components";
import { useColorTheme, useAuth } from "@contexts";

export const ModeToggle = () => {
  const { mode, setMode } = useColorTheme();

  return (
    <div className="flex flex-col text-txt justify-center items-center">
      {mode}
      <Toggle
        onChange={() => setMode(mode === "dark" ? "light" : "dark")}
        checked={mode === "dark"}
        label=""
      />
    </div>
  );
};
