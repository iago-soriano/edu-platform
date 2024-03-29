"use client";
import React, { useEffect, useState } from "react";
import { ActionLink } from "@components";
import { HamburguerButton } from "./hamburguer";
import {
  MyProfileButton,
  StudentAreaButton,
  TeacherAreaButton,
  SignInButton,
  SignUpButton,
  HomeButton,
  SignOutButton,
  Logo,
  NavButton,
} from "../components";
import { Dropdown } from "@components";
import { useClickOutside } from "@infrastructure";

export const DrawerMenuItem = ({ children, ...rest }) => (
  <NavButton {...rest} className={"w-full p-4"}>
    {children}
  </NavButton>
);

export const SmallScreenNavbar = ({
  currentPath,
  modeToggle,
  isAuthenticated,
  signOut,
}) => {
  const [burguerOpen, setBurguerOpen] = useState(false);
  const addRef = useClickOutside(() => {
    setBurguerOpen(false);
  });

  useEffect(() => {
    setBurguerOpen(false);
  }, [currentPath]);

  return (
    <>
      <nav className="justify-between max-w-full h-[6.7rem]">
        <ul className="flex flex-row justify-between overflow-hidden h-full">
          <li>
            <Logo />
          </li>
          <li>
            <div className="flex flex-row h-full items-center">
              {modeToggle}
              <HamburguerButton
                ref={addRef}
                open={burguerOpen}
                onClick={() => setBurguerOpen((o) => !o)}
              />
            </div>
          </li>
        </ul>
      </nav>
      <div ref={addRef}>
        <Dropdown className="w-full" open={burguerOpen}>
          <>
            <TeacherAreaButton
              currentPath={currentPath}
              Component={DrawerMenuItem}
            />
            <StudentAreaButton
              currentPath={currentPath}
              Component={DrawerMenuItem}
            />
            <hr />
            <HomeButton currentPath={currentPath} Component={DrawerMenuItem} />
            <hr />
            <MyProfileButton
              currentPath={currentPath}
              Component={DrawerMenuItem}
            />
            <SignOutButton signOut={signOut} />
          </>
        </Dropdown>
      </div>
    </>
  );
};
