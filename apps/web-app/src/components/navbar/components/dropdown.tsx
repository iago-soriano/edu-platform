import { twMerge } from "tailwind-merge";

export const Dropdown = ({
  children,
  open,
  className,
}: {
  children: React.ReactNode;
  open: boolean;
  className?: string;
}) => {
  const openClasses = open
    ? "opacity-100 -translate-y-0"
    : "-translate-y-3 pointer-events-none opacity-0";
  return (
    <div
      className={twMerge(
        "shadow-lg absolute overflow-y-hidden bg-surface2 z-50 transition-all",
        openClasses,
        className
      )}
    >
      {children}
    </div>
  );
};
