import React from "react";

export const getLocaleDateFromISO = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    // year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleString(undefined, options);
};

export const getLocaleDateTimeFromISO = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString(undefined, options);
};

export const getChildrenOnDisplayName = (children, displayName) => {
  return React.Children.map(children, (child) =>
    child.type.displayName === displayName ? child : null
  );
};

export const parseTimeToNumber = (str: string) => {
  return (
    3600 * Number(str.split(":")[0]) +
    60 * Number(str.split(":")[1]) +
    Number(str.split(":")[2])
  );
};

export const parseNumberToTimeLabel = (num: number) => {
  const hours = Math.floor(num / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor(num / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(num % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${mins}:${secs}`;
};

export * from "./refresh-token";

export function openInNewTab(href: string) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener noreferrer",
    href: href,
  }).click();
}
