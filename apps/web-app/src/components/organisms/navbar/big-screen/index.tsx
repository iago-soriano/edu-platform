"use client";
import React, { useState } from "react";
import {
  StudentAreaButton,
  TeacherAreaButton,
  CollectionsButton,
  SignInButton,
  SignUpButton,
  HomeButton,
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
  <NavButton {...rest} className={"mx-3 max-w-[100px]"}>
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
          <div className="flex flex-row w-full justify-start">
            {/* {isAuthenticated ? ( */}
            <li>
              <HomeButton
                isHighlighted={(cp) => cp.startsWith("/home")}
                currentPath={currentPath}
                Component={Button}
              />
            </li>
            <li>
              <TeacherAreaButton
                isHighlighted={(cp) => cp.startsWith("/teacher-area")}
                currentPath={currentPath}
                Component={Button}
              />
            </li>
            <li>
              <StudentAreaButton
                isHighlighted={(cp) => cp.startsWith("/student-area")}
                currentPath={currentPath}
                Component={Button}
              />
            </li>
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
