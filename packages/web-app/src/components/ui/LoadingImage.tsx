import { cx } from "styles/utils";
import Image from "next/image";
import React from "react";

type LoadingImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const LoadingImage = React.forwardRef<HTMLImageElement, LoadingImageProps>(
  (props, forwardedRef) => {
    const { src, alt, className } = props;

    return (
      <>
        <Image
          src={src ?? "/logos/tb-logo.svg"}
          width={"200"}
          height={"200"}
          className={cx(
            "w-auto h-auto dark:hidden animate-loadingImage",
            className
          )}
          alt={alt ?? "TrueBuilt logo"}
          ref={forwardedRef}
          priority={true}
        />

        <Image
          src={src ?? "/logos/tb-logo-dark.svg"}
          width={"200"}
          height={"200"}
          className={cx(
            "w-auto h-auto hidden dark:block animate-loadingImage",
            className
          )}
          alt={alt ?? "TrueBuilt logo"}
          ref={forwardedRef}
          priority={true}
        />
      </>
    );
  }
);

LoadingImage.displayName = "LoadingImage";

export { LoadingImage, type LoadingImageProps };
