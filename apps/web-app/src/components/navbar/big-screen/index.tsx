import React, { useState } from "react";
// import { ActionButton } from "./styles";
import {
  HowItWorksButton,
  DashboardButton,
  SignInButton,
  SignUpButton,
  ProductButton,
  SignOutButton,
  MyProfileButton,
  Logo,
  NavButton,
} from "../components";
import { ActionLink } from "@components";
import { ProfileImageButton } from "./profile-image-button";
import { ProfileDropDown } from "./profile-dropdown";
import { useClickOutside } from "@infrastructure";

const AuthenticatedSectionContainer = ({ children }) => (
  <div className="min-w-[100px] flex flex-row my-0 mx-2 justify-center">
    {children}
  </div>
);

export const Button = ({ children, ...rest }) => (
  <NavButton {...rest} className={"mx-3 w-20"}>
    {children}
  </NavButton>
);

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
  const addRef = useClickOutside(() => {
    console.log("nav");
    setIsDropdownOpen(false);
  });
  // console.log({ isDropdownOpen });
  const getAuthenticatedSection = () => {
    if (!isAuthenticated)
      return (
        <AuthenticatedSectionContainer>
          <li>
            <SignInButton currentPath={currentPath} Component={Button} />
          </li>
          <li className="flex items-center">
            <SignUpButton currentPath={currentPath} Component={ActionLink} />
          </li>
        </AuthenticatedSectionContainer>
      );
    return (
      <AuthenticatedSectionContainer>
        <li>
          <ProfileImageButton
            user={user}
            ref={addRef}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </li>
      </AuthenticatedSectionContainer>
    );
  };

  return (
    <>
      <nav className="max-w-full min-h-[3rem] bg-bkg">
        <ul className="flex flex-row justify-between overflow-x-hidden">
          <li>
            <Logo />
          </li>
          <div className="flex flex-row justify-center">
            {isAuthenticated ? (
              <li>
                <DashboardButton currentPath={currentPath} Component={Button} />
              </li>
            ) : (
              <li>
                <ProductButton currentPath={currentPath} Component={Button} />
              </li>
            )}
            <li>
              <HowItWorksButton currentPath={currentPath} Component={Button} />
            </li>
            {/* <NewActivityButton currentPath={currentPath} Component={Button} /> */}
          </div>
          <div className="flex">
            {modeToggle}
            {getAuthenticatedSection()}
          </div>
        </ul>
      </nav>
      <ProfileDropDown
        isDropdownOpen={isDropdownOpen}
        addClickOutsideRef={addRef}
        handleSignOut={handleSignOut}
        currentPath={currentPath}
      />
    </>
  );
};
