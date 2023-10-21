import { useState, useEffect } from "react";
import Image from "next/image";
import { ProfileImageContainer } from "./styles";

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
    <ProfileImageContainer onClick={() => setIsDropdownOpen((p) => !p)}>
      <Image alt={"Imagem de perfil"} src={src} width={60} height={60} />
      <p>{!user?.name ? "Olá!" : `Olá, ${user?.name}`}</p>
    </ProfileImageContainer>
  );
};
