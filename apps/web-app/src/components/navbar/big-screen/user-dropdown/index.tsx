import { useState, useEffect } from "react";
import { ProfileDropdown } from './styles';
import Image from "next/image";
import { NavbarImageContainer } from "../../components";
import { MyProfileButton, DrawerMenuItemStyled, SignOutButton } from '../../components';
import { Heading } from "@components";


export const ProfileImageButton = ({ user, currentPath, signOut }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [src, setSrc] = useState('/assets/images/generic_profile.svg');

    useEffect(() => {
        if(user) {
            const src = user.image || `https://api.dicebear.com/7.x/lorelei/png?seed=${user?.id}`;
            setSrc(src);
        }
    }, [user]);

    return (
        <>
        <NavbarImageContainer onClick={() => setIsDropdownOpen(p => !p)}>
            <Image alt={"Imagem de perfil"} src={src} width={50} height={50}/>
            <p>{!user?.name ? "Olá!" : `Olá, ${user?.name}`}</p>
        </NavbarImageContainer>
        <ProfileDropdown open={isDropdownOpen}>
            <MyProfileButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
            />
            <SignOutButton signOut={signOut}/>
        </ProfileDropdown>
        </>
    )
}