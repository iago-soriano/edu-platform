"use client";

import React, { useEffect, useState, useContext, ReactNode } from "react";
import { isModeValid, Modes, Theme } from "./types";
import { getTheme } from "./theme";
import { LocalStorageHelper } from "@infrastructure";

type ColorModeContextType = {
  mode: Modes;
  theme: Theme;
  setMode: (args?: string) => void;
};

const ColorModeContext = React.createContext<ColorModeContextType>({
  mode: "dark",
  theme: getTheme("dark"),
  setMode: () => {},
});

const storage = new LocalStorageHelper();

interface MyComponentProps {
  children: ReactNode;
  defaultTheme?: Modes;
}

export const ThemeProvider: React.FC<MyComponentProps> = ({
  children,
  defaultTheme,
}) => {
  const [mode, setModeState] = useState<Modes>(defaultTheme || "light");

  const setMode = (args?: string) => {
    let colorMode = defaultTheme || args || storage.getMode(mode);

    if (isModeValid(colorMode)) {
      setModeState(colorMode as Modes);
      storage.setMode(colorMode);
    }
  };

  useEffect(() => {
    setMode();
  }, [defaultTheme]);

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        theme: getTheme(mode),
        setMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ColorModeContext);
