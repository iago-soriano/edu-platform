import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link
    className="w-20 flex flex-col justify-center items-center h-full transition-opacity hover:opacity-80 focus-visible:opacity-80"
    href={'/home'}
  >
    <Image
      className="max-w-none"
      src="https://picsum.photos/50/50"
      width={50}
      height={50}
      alt="logo"
    />
  </Link>
);
