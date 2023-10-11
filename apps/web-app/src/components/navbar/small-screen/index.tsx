import { Separator } from "@components";
import React, { useEffect, useState } from "react";
import {
  Container,
  DrawerMenuStyled,
} from "./styles";
import { HamburguerButton } from "./hamburguer";
import { 
  HowItWorksButton,
  MyProfileButton,
  DashboardButton,
  NewActivityButton,
  SignInButton, 
  SignUpButton, 
  HomeButton, 
  Logo,
  DrawerMenuItemStyled
} from "../components";

export const SmallScreenNavbar = ({ currentPath, modeToggle, user, isAuthenticated }) => {
  const [burguerOpen, setBurguerOpen] = useState(false);
  useEffect(() => {
    setBurguerOpen(false);
  }, [currentPath]);

  return (
    <Container>
      <Logo />  
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        {modeToggle}
        <HamburguerButton open={burguerOpen} onClick={() => setBurguerOpen(o => !o)}/>
      </div>
      <DrawerMenuStyled open={burguerOpen}> 
        {isAuthenticated ?    
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
            <HomeButton
              currentPath={currentPath}
              Component={DrawerMenuItemStyled}
            />
            <HowItWorksButton
              currentPath={currentPath}
              Component={DrawerMenuItemStyled}
            />
            <hr/>
            <MyProfileButton
              currentPath={currentPath}
              Component={DrawerMenuItemStyled}
            />
            <button>Sair</button>
          </> : 
          <>
            <HomeButton
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
            <hr/>
            <SignUpButton
              currentPath={currentPath}
              Component={DrawerMenuItemStyled}
            />
            <SignInButton
              currentPath={currentPath}
              Component={DrawerMenuItemStyled}
            />
          </>
        }
              
      </DrawerMenuStyled>
    </Container>
  )
}