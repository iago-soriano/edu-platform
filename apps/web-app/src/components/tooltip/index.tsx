// import { Tooltip as LibToolTip } from 'react-tooltip';
import Tippy from "@tippyjs/react";
import React, { HtmlHTMLAttributes, ReactElement } from "react";

export const Tooltip = ({
  content,
  children,
  ...rest
}: HtmlHTMLAttributes<HTMLDivElement>) => {
  const Child = React.forwardRef<HTMLDivElement>((props, ref) =>
    // <div {...props} ref={ref}>
    //   {children}
    // </div>
    React.Children.map(children, (child) =>
      React.cloneElement(child as unknown as ReactElement, { ...props, ref })
    )
  );
  return typeof window == "undefined" ? (
    children
  ) : (
    <Tippy content={content}>
      <Child {...rest} />
    </Tippy>
  );
};
