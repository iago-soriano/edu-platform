import { Separator } from "@components";
import React, { useEffect, useState } from "react";
import {
  Container,
  DrawerMenuItemStyled,
  DrawerMenuStyled,
} from "./styles";
import { HamburguerButton } from "./hamburguer";
import { SignInButton, SignUpButton, HomeButton, Logo } from "../components";

export const SmallScreenNavbar = ({ currentPath, modeToggle, user, isAuthenticated }) => {
  const [burguerOpen, setBurguerOpen] = useState(false);
  useEffect(() => {
    setBurguerOpen(false);
  }, []);

  return (
    <Container>
      <Logo />  
      {modeToggle}
      <HamburguerButton open={burguerOpen} onClick={() => setBurguerOpen(o => !o)}/>
      {burguerOpen ? (
        <DrawerMenuStyled>           
          <SignInButton
            currentPath={currentPath}
            Component={DrawerMenuItemStyled}
          />
          <SignUpButton
            currentPath={currentPath}
            Component={DrawerMenuItemStyled}
          />
          <HomeButton
            currentPath={currentPath}
            Component={DrawerMenuItemStyled}
          />
          <Separator />
              
          </DrawerMenuStyled>
      ) : null} 
    </Container>
  )
}