import { LinkButton } from "components/ui/LinkButton";
import { usePathname } from "next/navigation";

/* export interface BaseNavbarButtonProps extends ButtonProps {
  path: string;
  children: any;
} */

export const BaseNavbarButton = ({ path, children, ...rest }) => {
  const currentPath = usePathname();
  return (
    <LinkButton href={path} {...rest}>
      {children}
    </LinkButton>
  );
};
