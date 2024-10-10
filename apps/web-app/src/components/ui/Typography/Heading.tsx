import { cx } from "styles/utils";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, VariantProps } from "tailwind-variants";

const headingVariants = tv({
  variants: {
    variant: {
      primary: "text-primary-foreground",
      secondary: "text-muted-foreground",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
      "7xl": "text-7xl",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
    weight: "bold",
    align: "left",
  },
});

interface HeadingProps
  extends ComponentPropsWithoutRef<"h1">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  asChild?: boolean;
  truncate?: boolean;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      className,
      asChild,
      as: Tag = "h1",
      variant,
      size,
      weight,
      align,
      truncate = false,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Slot
        ref={forwardedRef}
        className={cx(
          { truncate: truncate },
          headingVariants({ size, weight, align, variant }),
          className
        )}
        {...props}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    );
  }
);

Heading.displayName = "Heading";

export { Heading, type HeadingProps };
