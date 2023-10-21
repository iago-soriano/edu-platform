import { Separator } from "@components";
import React, { useEffect, useState } from "react";
import { Container, DrawerMenuStyled, ActionButton } from "./styles";
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
  DrawerMenuItemStyled,
} from "../components";

export const SmallScreenNavbar = ({
  currentPath,
  modeToggle,
  user,
  isAuthenticated,
  signOut,
}) => {
  const [burguerOpen, setBurguerOpen] = useState(false);
  useEffect(() => {
    setBurguerOpen(false);
  }, [currentPath]);

  return (
    <>
      <Container>
        <Logo />
        <div style={{ display: "flex", flexDirection: "row" }}>
          {modeToggle}
          <HamburguerButton
            open={burguerOpen}
            onClick={() => setBurguerOpen((o) => !o)}
          />
        </div>
      </Container>
      <div>
        <DrawerMenuStyled open={burguerOpen}>
          {isAuthenticated ? (
            <>
              <DashboardButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <NewActivityButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <hr />
              <ProductButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <HowItWorksButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <hr />
              <MyProfileButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <SignOutButton signOut={signOut} />
            </>
          ) : (
            <>
              <ProductButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <HowItWorksButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <NewActivityButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
              <hr />
              <div className="flex flex-row justify-center my-2 hover:opacity-80">
                <SignUpButton
                  currentPath={currentPath}
                  Component={ActionButton}
                />
              </div>
              <SignInButton
                currentPath={currentPath}
                Component={DrawerMenuItemStyled}
              />
            </>
          )}
        </DrawerMenuStyled>
      </div>
    </>
  );
};
