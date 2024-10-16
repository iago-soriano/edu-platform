// Tremor Raw Slider [v0.0.0]

"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cx, focusRing } from "styles/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ariaLabelThumb?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ariaLabelThumb, ...props }, forwardedRef) => {
  const value = props.value || props.defaultValue;
  return (
    <SliderPrimitive.Root
      ref={forwardedRef}
      className={cx(
        // base
        "relative flex cursor-pointer touch-none select-none",
        // orientation horizontal
        "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
        // orientation vertical
        "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
        // disabled
        "data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cx(
          // base
          "relative grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
          // orientation
          "data-[orientation='horizontal']:h-1.5 data-[orientation='horizontal']:w-full",
          "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-1.5",
          // disabled
          "data-[disabled]:bg-gray-100 dark:data-[disabled]:bg-gray-800"
        )}
      >
        <SliderPrimitive.Range
          className={cx(
            // base
            "absolute rounded-full bg-gray-900 dark:bg-gray-50",
            // orientation
            "data-[orientation='horizontal']:h-full",
            "data-[orientation='vertical']:w-full",
            // disabled
            "data-[disabled]:bg-gray-300 dark:data-[disabled]:bg-gray-700"
          )}
        />
      </SliderPrimitive.Track>
      {value?.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cx(
            // base
            "block size-4 shrink-0 rounded-full border-2 shadow transition-all",
            // boder color
            "border-gray-900 dark:border-gray-50",
            // background color
            "bg-white dark:bg-gray-50",
            // disabled
            "data-[disabled]:pointer-events-none data-[disabled]:bg-gray-300 dark:data-[disabled]:border-gray-500 dark:data-[disabled]:bg-gray-600",
            focusRing,
            "outline-offset-0"
          )}
          aria-label={ariaLabelThumb}
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
