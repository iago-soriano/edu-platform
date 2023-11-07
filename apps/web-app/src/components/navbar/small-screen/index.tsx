import React, { useEffect, useState } from "react";
import { ActionLink } from "@components";
import { HamburguerButton } from "./hamburguer";
import {
  HowItWorksButton,
  MyProfileButton,
  DashboardButton,
  NewActivityButton,
  SignInButton,
  SignUpButton,
  ProductButton,
  SignOutButton,
  Logo,
  NavButton,
  Dropdown,
} from "../components";
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
    console.log("nav");
    setBurguerOpen(false);
  });

  useEffect(() => {
    setBurguerOpen(false);
  }, [currentPath]);

  return (
    <>
      <nav className="justify-between max-w-full h-[6.7rem] bg-bkg">
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
          {isAuthenticated ? (
            <>
              <DashboardButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <NewActivityButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <hr />
              <ProductButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <HowItWorksButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <hr />
              <MyProfileButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <SignOutButton signOut={signOut} />
            </>
          ) : (
            <>
              <ProductButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <HowItWorksButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <NewActivityButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
              <hr />
              <div className="flex flex-row justify-center my-2 hover:opacity-80">
                <SignUpButton
                  currentPath={currentPath}
                  Component={ActionLink}
                />
              </div>
              <SignInButton
                currentPath={currentPath}
                Component={DrawerMenuItem}
              />
            </>
          )}
        </Dropdown>
      </div>
    </>
  );
};
