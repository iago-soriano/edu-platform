import React, { useEffect, useState, useContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { isModeValid, Modes, Theme } from "./types";
import { getTheme } from "./theme";
import { LocalStorageHelper } from "@infrastructure";

type ColorModeContextType = {
  mode: "dark" | "light";
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
}

export const ThemeProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [mode, setModeState] = useState<Modes>("dark");

  const setMode = (args?: string) => {

    const colorMode = args || storage.getMode(mode);

    if (isModeValid(colorMode)) {
      setModeState(colorMode as Modes);
      storage.setMode(colorMode);
    }
  };

  useEffect(() => {
    setMode();
  }, []);

  return (
    <StyledThemeProvider theme={getTheme(mode)}>
      <ColorModeContext.Provider
        value={{
          mode,
          theme: getTheme(mode),
          setMode,
        }}
      >
        {children}
      </ColorModeContext.Provider>
    </StyledThemeProvider>
  );
};

export const useColorTheme = () => useContext(ColorModeContext);
