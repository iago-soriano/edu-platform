import { ReactNode, FC, MouseEventHandler, AnchorHTMLAttributes } from "react";
import { StyledComponent } from "styled-components";
interface ButtonDefinition {
  label: string;
  path: string;
}

export interface NavbarButtonProps {
  // Component: StyledComponent<HTMLAnchorElement, unknown> & FC<
  //   {
  //     highlighted: boolean;
  //     children: ReactNode;
  //   } & AnchorHTMLAttributes<HTMLAnchorElement>
  // >;
  Component: any; // TODO: figure out this type
  currentPath: string;
  icon?: ReactNode;
}

export const AbstractNavbarButton = ({
  path,
  currentPath,
  label,
  Component,
  icon,
}: NavbarButtonProps & ButtonDefinition) => {
  return (
    <Component
      href={path}
      highlighted={currentPath === path} /*onClick={onClick}*/
    >
      {icon && <div style={{ paddingRight: 10 }}>{icon}</div>}
      {label}
    </Component>
  );
};
