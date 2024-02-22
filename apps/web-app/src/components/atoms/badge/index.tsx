import { twMerge } from "tailwind-merge";

const variantStyles = {};
export const Badge = ({ classes, children }) => (
  <div className={twMerge("rounded p-2", classes)}>{children}</div>
);
