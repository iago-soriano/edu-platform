// Tremor Raw Button [v0.1.1]

import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { RiLoader2Fill } from "@remixicon/react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx, focusRing } from "../../styles/utils";

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
        // "border-green-600 dark:border-green-700",
        // text color
        "text-white",
        // background color
        "bg-primary",
        // hover color
        "hover:bg-surface1",
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
    forwardedRef
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
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };

// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { Icons } from "./icons";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@infrastructure";
// import { twMerge } from "tailwind-merge";
// import NextLink from "next/link";
// import { Spinner } from "./spinner";

// export const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         action: "bg-accent text-primary-foreground shadow hover:bg-accent/90",
//         actionActive:
//           "bg-accent text-primary-foreground shadow hover:bg-accent/90 font-bold",
//         default:
//           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline hover:opacity-70",
//         linkActive:
//           "text-primary underline-offset-4 hover:underline hover:opacity-70 text-accent font-bold",
//         drawerActive:
//           "hover:opacity-70 active:bg-accent active:bg-opacity-70 active:opacity-100 text-accent font-bold",
//         drawer:
//           "hover:opacity-70 active:bg-accent active:bg-opacity-70 active:opacity-100",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8 py-2 min-w-[140px]",
//         full: "w-full p-3",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
//   isLoading?: boolean;
//   withIcon?: keyof typeof Icons;
// }

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       className,
//       variant,
//       size,
//       withIcon,
//       asChild = false,
//       isLoading = false,
//       disabled = false,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const Comp = asChild ? Slot : "button";
//     const Icon = withIcon && Icons[withIcon];
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         disabled={disabled || isLoading}
//         ref={ref}
//         {...props}
//       >
//         {isLoading ? (
//           <>
//             <Spinner />{" "}
//             <span
//               className={twMerge(
//                 "pl-1",
//                 variant === "action" ? "text-base" : "text-sm"
//               )}
//             >
//               Please wait...
//             </span>
//           </>
//         ) : withIcon ? (
//           <>
//             {Icon && <Icon size={20} />}
//             {children}
//           </>
//         ) : (
//           children
//         )}
//       </Comp>
//     );
//   }
// );
// Button.displayName = "Button";

// interface ButtonLinkProps
//   extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
//     VariantProps<typeof buttonVariants> {
//   disabled?: boolean;
//   active?: boolean;
//   withIcon?: keyof typeof Icons;
//   href: string;
// }
// export const Link = ({
//   href,
//   className,
//   withIcon,
//   variant,
//   size,
//   active,
//   disabled,
//   children,
//   ...rest
// }: ButtonLinkProps) => {
//   const Icon = withIcon && Icons[withIcon];

//   const variantClass = variant || "link";
//   const variantClassWithActive = active
//     ? `${variant || "link"}Active`
//     : variantClass;

//   return disabled ? (
//     <Button
//       disabled={true}
//       className={cn(
//         buttonVariants({
//           variant: variantClassWithActive as any,
//           className,
//           size,
//         }),
//         className
//       )}
//     >
//       {withIcon ? (
//         <>
//           {Icon && <Icon className="mx-2" size={20} />}
//           {children}
//         </>
//       ) : (
//         children
//       )}
//     </Button>
//   ) : (
//     <NextLink
//       className={cn(
//         buttonVariants({
//           variant: variantClassWithActive as any,
//           className,
//           size,
//         }),
//         className
//       )}
//       href={href}
//       {...rest}
//     >
//       {withIcon ? (
//         <>
//           {Icon && <Icon className="mx-2" size={20} />}
//           {children}
//         </>
//       ) : (
//         children
//       )}
//     </NextLink>
//   );
// };
