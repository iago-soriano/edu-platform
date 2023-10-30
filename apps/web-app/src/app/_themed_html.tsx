"use client";
import { useColorTheme } from "@contexts";
export const ThemedHtml = ({ children }) => {
  const { mode } = useColorTheme();
  return (
    <html lang="en" data-theme={mode} className="text-txt">
      {children}
    </html>
  );
};
