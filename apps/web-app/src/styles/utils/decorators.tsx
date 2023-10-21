import React from "react";
import { ThemeProvider } from "@contexts";

export const ThemeStorybookDecorator = (Story, context) => {
  const hexColor =
    context.globals.backgrounds?.value?.replace(/^#/, "") || "ffffff";

  // Parse the hexadecimal values for r, g, and b
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  const avrg = (r + g + b) / 3;
  const isLight = avrg > 126;
  const defaultTheme = isLight ? "light" : "dark";

  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Story />
    </ThemeProvider>
  );
};
