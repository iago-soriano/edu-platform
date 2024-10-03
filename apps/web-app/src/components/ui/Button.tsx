// Tremor Raw Button [v0.1.1]

import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { RiLoader2Fill } from "@remixicon/react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusRing } from "styles/styles";

const buttonVariants = tv({
  base: [
    // base
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border text-center text-sm font-medium shadow-sm transition gap-2",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        // border
        "border-green-600 dark:border-green-700",
        // text color
        "text-white",
        // background color
        "bg-primary",
        // hover color
        "hover:bg-primary/90",
        // disabled
        "disabled:text-white/80 disabled:bg-green-500/70 dark:disabled:text-white/40 dark:disabled:bg-green-500/50",
      ],
      secondary: [
        // border
        "border-secondary-foreground",
        // text color
        "text-primary-foreground",
        // background color
        "bg-secondary dark:bg-foreground",
        //hover color
        "hover:bg-secondary/70 dark:hover:bg-foreground/70",
        // disabled
        "disabled:text-primary-foreground/20 disabled:bg-secondary/50",
      ],
      tertiary: [
        // base
        "shadow-none border",
        // text color
        "text-accent",
        // background color
        "bg-card",
        // hover color
        "hover:bg-card/40",
        // disabled
        "disabled:bg-green-100 disabled:text-green-400",
        "disabled:dark:bg-green-800 disabled:dark:text-green-600",
      ],
      outline: [
        // border
        "border-secondary-foreground",
        // text color
        "text-primary-foreground",
        // background color
        "bg-transparent",
        // hover color
        "hover:bg-secondary-foreground dark:hover:bg-foreground",
        // disabled
        "disabled:text-primary-foreground/50 disabled:bg-secondary",
      ],
      "primary-outline": [
        // border
        "border-primary",
        // text color
        "text-primary",
        // background color
        "bg-transparent",
        // hover color
        "hover:bg-green-500 hover:text-card dark:hover:bg-green-800 dark:hover:text-card",
        // disabled
        "disabled:text-primary/50 disabled:bg-transparent",
      ],
      ghost: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-primary-foreground",
        // hover color
        "hover:bg-secondary dark:bg-transparent dark:hover:bg-foreground",
        // disabled
        "disabled:text-primary-foreground/40",
      ],
      destructive: [
        // text color
        "text-white",
        // border
        "border-transparent",
        // background color
        "bg-destructive",
        // hover color
        "hover:bg-destructive/80",
        // disabled
        "disabled:bg-red-300 disabled:text-white",
        "disabled:dark:bg-red-950 disabled:dark:text-red-400",
      ],
      "destructive-outline": [
        // border
        "border-destructive",
        // text color
        "text-destructive",
        // background color
        "bg-transparent",
        // hover color
        "hover:bg-destructive hover:text-white",
        // disabled
        "disabled:text-destructive/50 disabled:bg-transparent",
      ],
    },
    size: {
      sm: "h-9 px-3",
      default: "h-10 px-3 py-2",
      lg: "h-11 px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      size,
      children,
      leftIcon,
      rightIcon,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <RiLoader2Fill
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          <>
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
          </>
        )}
      </Component>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };