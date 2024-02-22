import { ReactNode, FC, MouseEventHandler, AnchorHTMLAttributes } from "react";

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
  isHighlighted?: (path: string) => boolean;
}

export const AbstractNavbarButton = ({
  path,
  currentPath,
  label,
  Component,
  icon,
  isHighlighted,
}: NavbarButtonProps & ButtonDefinition) => {
  return (
    <Component
      href={path}
      highlighted={
        isHighlighted ? isHighlighted(currentPath) : currentPath === path
      }
    >
      {icon && <div style={{ paddingRight: 10 }}>{icon}</div>}
      {label}
    </Component>
  );
};
