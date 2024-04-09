import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Icons } from "../icons";
import { Spinner } from "../spinner";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@infrastructure";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        action: "bg-accent text-primary-foreground shadow hover:bg-accent/90",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 py-2 min-w-[140px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  withIcon?: keyof typeof Icons;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      withIcon,
      asChild = false,
      isLoading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const Icon = withIcon && Icons[withIcon];
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />{" "}
            <span
              className={twMerge(
                "pl-1",
                variant === "action" ? "text-base" : "text-sm"
              )}
            >
              Please wait...
            </span>
          </>
        ) : withIcon ? (
          <>
            {Icon && <Icon size={20} />}
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

interface LinkWithIconProps {
  // extends React.AnchorHTMLAttributes<HTMLAnchorElement>
  icon: keyof typeof Icons;
  href: string;
}
export const LinkWithIcon = ({ icon, href }: LinkWithIconProps) => {
  const Icon = icon && Icons[icon];
  return (
    <Button variant={"link"} size={"icon"} asChild>
      <Link href={href}>
        <Icon />
      </Link>
    </Button>
  );
};

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}
export const ButtonLink = ({ href, children, className }: ButtonLinkProps) => {
  return (
    <Button asChild variant="link" className={className}>
      <Link href={href || ""}>{children}</Link>
    </Button>
  );
};
