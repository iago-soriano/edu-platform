"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export const ProfileImageButton = ({ user, setIsDropdownOpen }) => {
  const [src, setSrc] = useState("/assets/images/generic_profile.svg");

  useEffect(() => {
    if (user) {
      const src =
        user.image ||
        `https://api.dicebear.com/7.x/lorelei/png?seed=${user?.id}`;
      setSrc(src);
    }
  }, [user]);

  return (
    <div
      className="flex flex-col items-center justify-center p-5 max-w-[150px]"
      onClick={() => setIsDropdownOpen((p) => !p)}
    >
      <Image
        className="rounded-full"
        alt={"Imagem de perfil"}
        src={src}
        width={60}
        height={60}
      />
      <p className="font-bold p-0 text-center text-txt">
        {!user?.name ? "Olá!" : `Olá, ${user?.name}`}
      </p>
    </div>
  );
};
