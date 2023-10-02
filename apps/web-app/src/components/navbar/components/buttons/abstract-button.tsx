import Link from "next/link";
import { ReactNode, FC, MouseEventHandler } from "react";

interface ButtonDefinition {
  label: string;
  path: string;
}

export interface NavbarButtonProps {
  Component: FC<{ highlighted: boolean, onClick?: MouseEventHandler, children: ReactNode}>;
  currentPath: string;
}

export const AbstractNavbarButton = ({
  path,
  currentPath,
  label,
  // onClick,
  Component
}: NavbarButtonProps & ButtonDefinition) => {

  return (
    <Component highlighted={currentPath === path} /*onClick={onClick}*/>
      <Link href={path}>{label}</Link>
    </Component>
  );
};