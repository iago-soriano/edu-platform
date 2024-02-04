// import { Tooltip as LibToolTip } from 'react-tooltip';
import Tippy from "@tippyjs/react";
import React, { HtmlHTMLAttributes } from "react";

export const Tooltip = ({
  content,
  children,
  ...rest
}: HtmlHTMLAttributes<HTMLDivElement>) => {
  const Child = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div {...props} ref={ref}>
      {children}
    </div>
  ));
  return typeof window == "undefined" ? (
    <div>{children}</div>
  ) : (
    <Tippy content={content}>
      <Child {...rest} />
    </Tippy>
  );
};
