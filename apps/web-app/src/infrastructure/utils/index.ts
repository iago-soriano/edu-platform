import React from "react";

export const getLocaleTimeFromISO = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
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
