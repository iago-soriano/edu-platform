import { cx } from "styles/utils";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, VariantProps } from "tailwind-variants";

const textVariants = tv({
  variants: {
    variant: {
      primary: "text-primary-foreground",
      secondary: "text-muted-foreground",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "inherit",
      lg: "text-lg",
      xl: "text-xl",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
    weight: "regular",
    align: "left",
  },
});

interface TextProps
  extends ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "small";
  asChild?: boolean;
  truncate?: boolean;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      className,
      asChild,
      as: Tag = "p",
      variant,
      size,
      weight,
      align,
      truncate = false,
      transform,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Slot
        ref={forwardedRef}
        className={cx(
          { truncate: truncate },
          textVariants({ variant, size, weight, align, transform }),
          className
        )}
        {...props}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    );
  }
);

Text.displayName = "Text";

export { Text, type TextProps };
