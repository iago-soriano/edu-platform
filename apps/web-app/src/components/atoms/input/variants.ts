import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "block p-4 rounded bg-surface3 placeholder:opacity-80 placeholder:text-text2",
        defaultError:
          "block p-4 rounded bg-surface3 placeholder:opacity-80 placeholder:text-text2 border border-error",
        ghost:
          "block p-2 rounded placeholder:txt-text2 placeholder:opacity-80 outline-none focus:shadow-outline bg-inherit",
        ghostError:
          "block p-2 rounded placeholder:txt-text2 placeholder:opacity-80 outline-none focus:shadow-outline bg-inherit border-error border-2",
      },
      //   error: {

      //   },
      tamanheza: {
        default: "lg:w-[45%] md:w-[60%] w-[95%] mb-5",
        lg: "lg:w-[50%] md:w-[70%] w-[95%] mb-5",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      tamanheza: "default",
    },
  }
);
