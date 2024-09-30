import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Icons } from "../icons";
import { Spinner } from "../spinner";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@infrastructure";
import { twMerge } from "tailwind-merge";
import NextLink from "next/link";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        action: "bg-accent text-primary-foreground shadow hover:bg-accent/90",
        actionActive:
          "bg-accent text-primary-foreground shadow hover:bg-accent/90 font-bold",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:opacity-70",
        linkActive:
          "text-primary underline-offset-4 hover:underline hover:opacity-70 text-accent font-bold",
        drawerActive:
          "hover:opacity-70 active:bg-accent active:bg-opacity-70 active:opacity-100 text-accent font-bold",
        drawer:
          "hover:opacity-70 active:bg-accent active:bg-opacity-70 active:opacity-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 py-2 min-w-[140px]",
        full: "w-full p-3",
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  active?: boolean;
  withIcon?: keyof typeof Icons;
  href: string;
}
export const Link = ({
  href,
  className,
  withIcon,
  variant,
  size,
  active,
  disabled,
  children,
  ...rest
}: ButtonLinkProps) => {
  const Icon = withIcon && Icons[withIcon];

  const variantClass = variant || "link";
  const variantClassWithActive = active
    ? `${variant || "link"}Active`
    : variantClass;

  return disabled ? (
    <Button
      disabled={true}
      className={cn(
        buttonVariants({
          variant: variantClassWithActive as any,
          className,
          size,
        }),
        className
      )}
    >
      {withIcon ? (
        <>
          {Icon && <Icon className="mx-2" size={20} />}
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  ) : (
    <NextLink
      className={cn(
        buttonVariants({
          variant: variantClassWithActive as any,
          className,
          size,
        }),
        className
      )}
      href={href}
      {...rest}
    >
      {withIcon ? (
        <>
          {Icon && <Icon className="mx-2" size={20} />}
          {children}
        </>
      ) : (
        children
      )}
    </NextLink>
  );
};
