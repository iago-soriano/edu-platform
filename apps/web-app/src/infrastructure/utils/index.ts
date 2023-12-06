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
