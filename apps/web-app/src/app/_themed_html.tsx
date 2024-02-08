"use client";
import { useColorTheme } from "@contexts";
export const ThemedHtml = ({ children }) => {
  const { mode } = useColorTheme();
  return (
    <html lang="pt-BR" data-theme={mode}>
      {children}
    </html>
  );
};
