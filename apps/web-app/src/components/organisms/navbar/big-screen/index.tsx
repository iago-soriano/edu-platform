"use client";
import React, { useState } from "react";
import { ProfileImageButton } from "./profile-image-button";
import { ProfileDropDown } from "./profile-dropdown";
import { useClickOutside } from "@infrastructure";
import { ModeToggle, Logo } from "../components";
import { BaseNavbarButton } from "../base-button";
import { Router } from "@infrastructure";

const AuthenticatedSectionContainer = ({ children }) => (
  <div className="min-w-[100px] flex flex-row my-0 mx-2 justify-center">
    {children}
  </div>
);

const ButtonContainer = ({ children }) => (
  <li className="flex items-center">{children}</li>
);

export const BigScreenNavbar = ({ user, isAuthenticated, signOut }) => {
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
          <ButtonContainer>
            <BaseNavbarButton path="/auth/sign-in" withIcon="USER">
              Sign In
            </BaseNavbarButton>
          </ButtonContainer>
          <ButtonContainer>
            <BaseNavbarButton path="/auth/sign-up" variant="action">
              Sign Up
            </BaseNavbarButton>
          </ButtonContainer>
        </AuthenticatedSectionContainer>
      );
    return (
      <AuthenticatedSectionContainer>
        <ButtonContainer>
          <ProfileImageButton
            user={user}
            ref={addRef}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </ButtonContainer>
      </AuthenticatedSectionContainer>
    );
  };

  return (
    <>
      <nav className="max-w-full h-[6.7rem]">
        <ul className="h-full flex flex-row justify-between overflow-x-hidden">
          <ButtonContainer>
            <Logo />
          </ButtonContainer>
          <div className="flex flex-row w-full justify-start">
            <ButtonContainer>
              <BaseNavbarButton path="/home">Home</BaseNavbarButton>
            </ButtonContainer>
            <ButtonContainer>
              <BaseNavbarButton path={Router.teacherHome}>
                Teacher Area
              </BaseNavbarButton>
            </ButtonContainer>
            <ButtonContainer>
              <BaseNavbarButton path={Router.studentHome}>
                Student Area
              </BaseNavbarButton>
            </ButtonContainer>
          </div>
          <div className="flex">
            {/* <ModeToggle /> */}
            {getAuthenticatedSection()}
          </div>
        </ul>
      </nav>
      <ProfileDropDown
        isDropdownOpen={isDropdownOpen}
        addClickOutsideRef={addRef}
        handleSignOut={handleSignOut}
      />
    </>
  );
};
