"use client";
import React, { useEffect, useState } from "react";
import { HamburguerButton } from "./hamburguer";
import { BaseNavbarButton } from "../base-button";
import { Router } from "@infrastructure";

import { Dropdown } from "@components";
import { useClickOutside } from "@infrastructure";
import { ModeToggle, Logo } from "../components";
import { usePathname } from "next/navigation";

const DrawerButton = ({ children, path, ...rest }) => (
  <BaseNavbarButton path={path} {...rest} variant={"drawer"} size="full">
    {children}
  </BaseNavbarButton>
);

export const SmallScreenNavbar = ({ isAuthenticated, signOut }) => {
  const pathName = usePathname();

  const [burguerOpen, setBurguerOpen] = useState(false);
  const addRef = useClickOutside(() => {
    setBurguerOpen(false);
  });

  useEffect(() => {
    setBurguerOpen(false);
  }, [pathName]);

  return (
    <>
      <nav className="justify-between max-w-full h-[6.7rem]">
        <ul className="flex flex-row justify-between overflow-hidden h-full">
          <li>
            <Logo />
          </li>
          <li>
            <div className="flex flex-row h-full items-center">
              {/* <ModeToggle /> */}
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
        <Dropdown
          className="w-full flex flex-col items-center py-2"
          open={burguerOpen}
        >
          <>
            <DrawerButton path="/auth/sign-in" withIcon="USER">
              Sign In
            </DrawerButton>
            <BaseNavbarButton path="/auth/sign-up" variant="action" size="lg">
              Sign Up
            </BaseNavbarButton>
            {/* <TeacherAreaButton
            />
            <StudentAreaButton
            />
            <hr />
            <HomeButton  />
            <hr />
            <MyProfileButton
            />
            <SignOutButton signOut={signOut} /> */}
          </>
        </Dropdown>
      </div>
    </>
  );
};
