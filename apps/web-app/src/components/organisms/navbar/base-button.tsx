import { usePathname } from "next/navigation";
import { ButtonLink, ButtonProps } from "@components";

export interface BaseNavbarButtonProps extends ButtonProps {
  path: string;
}

export const BaseNavbarButton = ({
  path,
  children,
  ...rest
}: BaseNavbarButtonProps) => {
  const currentPath = usePathname();
  return (
    <ButtonLink href={path} active={currentPath.startsWith(path)} {...rest}>
      {children}
    </ButtonLink>
  );
};
