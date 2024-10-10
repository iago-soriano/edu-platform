import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => (
  <Image
    className="max-w-none"
    src="https://picsum.photos/50/50"
    width={50}
    height={50}
    alt="logo"
  />
);
