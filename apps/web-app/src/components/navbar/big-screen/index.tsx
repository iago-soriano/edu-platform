import React, { useState } from "react";
import {
  Container,
  AuthenticatedSectionContainer,
  Button,
  ActionButton,
  ProfileDropdown,
  ProfileDropdownContainer,
} from "./styles";
import {
  HowItWorksButton,
  DashboardButton,
  NewActivityButton,
  SignInButton,
  SignUpButton,
  ProductButton,
  Logo,
} from "../components";
import { ProfileImageButton } from "./user-dropdown";
import {
  MyProfileButton,
  DrawerMenuItemStyled,
  SignOutButton,
} from "../components";

export const BigScreenNavbar = ({
  currentPath,
  modeToggle,
  user,
  isAuthenticated,
  signOut,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
  };

  const getAuthenticatedSection = () => {
    if (!isAuthenticated)
      return (
        <AuthenticatedSectionContainer>
          <SignInButton currentPath={currentPath} Component={Button} />
          <SignUpButton currentPath={currentPath} Component={ActionButton} />
        </AuthenticatedSectionContainer>
      );
    return (
      <AuthenticatedSectionContainer>
        {/* <DashboardButton currentPath={currentPath} Component={Button} /> */}
        <ProfileImageButton user={user} setIsDropdownOpen={setIsDropdownOpen} />
      </AuthenticatedSectionContainer>
    );
  };

  return (
    <>
      <Container>
        <Logo />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {isAuthenticated ? (
            <DashboardButton currentPath={currentPath} Component={Button} />
          ) : (
            <ProductButton currentPath={currentPath} Component={Button} />
          )}
          <HowItWorksButton currentPath={currentPath} Component={Button} />
          {/* <NewActivityButton currentPath={currentPath} Component={Button} /> */}
        </div>
        <div style={{ display: "flex" }}>
          {modeToggle}
          {getAuthenticatedSection()}
        </div>
      </Container>
      <ProfileDropdownContainer>
        <ProfileDropdown open={isDropdownOpen}>
          <MyProfileButton
            currentPath={currentPath}
            Component={DrawerMenuItemStyled}
          />
          <SignOutButton signOut={handleSignOut} />
        </ProfileDropdown>
      </ProfileDropdownContainer>
    </>
  );
};
