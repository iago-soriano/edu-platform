// Tremor Raw cx [v0.0.0]

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-rose-500 dark:border-rose-700",
  // ring color
  "ring-rose-200 dark:ring-rose-700/30",
];

export function generateBackgroundColor(
  firstName: string,
  lastName: string
): string {
  // Combine first and last name to generate a unique value
  const fullName = firstName.toLowerCase() + lastName.toLowerCase();

  // Calculate a deterministic hash (simple sum of ASCII values for demo)
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a 6-digit hex color
  const hexColor =
    `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}` +
    `${((hash >> 16) & 0xff).toString(16).padStart(2, "0")}` +
    `${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}`;

  return hexColor;
}
