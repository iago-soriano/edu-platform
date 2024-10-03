import { cx } from "styles/styles";
import { Slot } from "@radix-ui/react-slot";
import { RiLoader2Fill } from "@remixicon/react";
import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { buttonVariants } from "./Button";

type LinkButtonProps = {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & LinkProps &
  ComponentPropsWithoutRef<"a"> &
  VariantProps<typeof buttonVariants>;

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      variant,
      size,
      children,
      leftIcon,
      rightIcon,
      ...props
    }: LinkButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : Link;

    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant, size }), className)}
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

LinkButton.displayName = "LinkButton";

export { LinkButton };
