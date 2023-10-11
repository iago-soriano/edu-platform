import { useState } from "react";
import { ProfileDropdown } from './styles';
import Image from "next/image";
import { NavbarImageContainer } from "../../components";

import { MyProfileButton, DrawerMenuItemStyled, SignOutButton } from '../../components';

export const ProfileImageButton = ({ user, currentPath, signOut }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const src = user?.image || 'https://picsum.photos/50/50';
    return (
        <>
        <NavbarImageContainer onClick={() => setIsDropdownOpen(p => !p)}>
            <Image alt={user?.name} src={src} width={50} height={50}/>
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