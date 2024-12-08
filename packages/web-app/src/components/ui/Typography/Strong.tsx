import { cx } from "styles/utils";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, VariantProps } from "tailwind-variants";

const strongVariants = tv({
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

interface StrongProps
  extends ComponentPropsWithoutRef<"strong">,
    VariantProps<typeof strongVariants> {
  asChild?: boolean;
  truncate?: boolean;
}

const Strong = forwardRef<HTMLSpanElement, StrongProps>(
  (
    { children, className, asChild, align, truncate = false, ...props },
    forwardedRef
  ) => {
    return (
      <Slot
        ref={forwardedRef}
        className={cx(
          { truncate: truncate },
          strongVariants({ align }),
          className
        )}
        {...props}
      >
        {asChild ? children : <strong>{children}</strong>}
      </Slot>
    );
  }
);

Strong.displayName = "Strong";

export { Strong, type StrongProps };
