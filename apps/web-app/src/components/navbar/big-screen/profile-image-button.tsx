"use client";
import { forwardRef } from "react";
import Image from "next/image";

export const ProfileImageButton = forwardRef<
  HTMLButtonElement,
  { user: { image: string; id: string; name: string }; setIsDropdownOpen: any }
>(({ user, setIsDropdownOpen }, ref) => {
  return (
    <button
      className="h-full p-2 flex flex-col items-center justify-center max-w-[150px] transition-opacity hover:opacity-80 focus-visible:opacity-80"
      onClick={() => setIsDropdownOpen((p: boolean) => !p)}
      ref={ref}
    >
      <Image
        className="rounded-full border-2 border-accent"
        alt={"Imagem de perfil"}
        src={
          user.image ||
          `https://api.dicebear.com/7.x/lorelei/png?seed=${user?.id}`
        }
        width={60}
        height={60}
      />
      {/* <p className="font-bold py-1 text-center text-text1 max-w-[120px] truncate">
        {!user?.name ? "Olá!" : user?.name}
      </p> */}
    </button>
  );
});
