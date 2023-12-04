import React, { useState } from "react";
import {
  HowItWorksButton,
  DashboardButton,
  SignInButton,
  SignUpButton,
  ProductButton,
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
  <NavButton {...rest} className={"mx-3 w-min-20"}>
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
    setIsDropdownOpen(false);
  });

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
      <nav className="max-w-full h-[6.7rem]">
        <ul className="h-full flex flex-row justify-between overflow-x-hidden">
          <li>
            <Logo />
          </li>
          <div className="flex flex-row justify-center">
            {isAuthenticated ? (
              <li>
                <DashboardButton
                  isHighlighted={(cp) => cp.startsWith("/dashboard")}
                  currentPath={currentPath}
                  Component={Button}
                />
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
