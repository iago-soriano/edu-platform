import { usePathname } from "next/navigation";
import { Link, ButtonProps } from "@components";

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
    <Link href={path} active={currentPath.startsWith(path)} {...rest}>
      {children}
    </Link>
  );
};
