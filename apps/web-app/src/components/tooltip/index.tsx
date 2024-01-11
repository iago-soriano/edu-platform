// import { Tooltip as LibToolTip } from 'react-tooltip';
import Tippy from "@tippyjs/react";
import React from "react";

export const Tooltip = ({ content, children }) => {
  const Child = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref}>{children}</div>
  ));
  return typeof window == "undefined" ? (
    <div>{children}</div>
  ) : (
    <Tippy content={content}>
      <Child />
    </Tippy>
  );
};
