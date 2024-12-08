import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { tv, type VariantProps } from "tailwind-variants";
import { cx } from "styles/utils";

const labelVariants = tv({
  base: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  variants: {
    weight: {
      regular: "font-normal",
      medium: "font-medium",
    },
  },
});

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, weight = "medium", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cx(labelVariants({ weight }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
