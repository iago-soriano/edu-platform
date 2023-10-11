
export type Modes = "dark" | "light";

export const isModeValid = (mode: string) =>
  mode === "dark" || mode === "light";

export interface Colors {
  primary: string; // 60%
  secondary: string; // 30%
  accent: string; // 10%,
  text: string;
  error?: string;
  backgroundAccent?: string;
}

export interface Theme {
  colors: Colors;
  responsiveBreakpoint: number;
}
