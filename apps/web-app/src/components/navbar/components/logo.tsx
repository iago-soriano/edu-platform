import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link
    className="flex flex-col justify-center h-full transition-opacity hover:opacity-80 focus-visible:opacity-80"
    href={"/"}
  >
    <Image
      src="https://picsum.photos/50/50"
      width={50}
      height={50}
      alt="logo"
    />
  </Link>
);
