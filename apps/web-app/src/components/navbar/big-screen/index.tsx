import React from "react";
import {
  Container,
  AuthenticatedSectionContainer,
  Button
} from "./styles";
import { 
  HowItWorksButton,
  DashboardButton,
  NewActivityButton,
  SignInButton, 
  SignUpButton, 
  HomeButton, 
  Logo 
} from "../components";
import { ProfileImageButton } from './user-dropdown';

export const BigScreenNavbar = ({ currentPath, modeToggle, user, isAuthenticated, signOut }) => {

  const getAuthenticatedSection = () => {
    if (!isAuthenticated)
      return (
        <AuthenticatedSectionContainer>
          <SignInButton
            currentPath={currentPath}
            Component={Button}
          />
          <SignUpButton
            currentPath={currentPath}
            Component={Button}
          />
        </AuthenticatedSectionContainer>
      );
    return (
      <AuthenticatedSectionContainer>
        <DashboardButton
          currentPath={currentPath}
          Component={Button}
        />
        <ProfileImageButton
          user={user}
          currentPath={currentPath}
          signOut={signOut}
        />
        {/* <button onClick={signOut}>Sair</button> */}
      </AuthenticatedSectionContainer>
    );
  };

  return(
    <Container>
      <Logo />
      <div>
        <HomeButton
          currentPath={currentPath}
          Component={Button}
        />
        <HowItWorksButton
          currentPath={currentPath}
          Component={Button}
        />
        <NewActivityButton
          currentPath={currentPath}
          Component={Button}
        />
      </div>
      <div style={{ display: 'flex'}}>
        {modeToggle}
        {getAuthenticatedSection()}
      </div>
    </Container>
  )
/*
  return (
    <>
      <Container>
        <LogoImageContainer>
          <Link href={"/"}>
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
          </Link>
        </LogoImageContainer>
        <MediaQuery maxWidth={responsiveBreakpoint}>
          {" "}
          <HamburguerButtonContainer>
            <HamburguerButton
              open={burguerOpen}
              onClick={() => setBurguerOpen((open) => !open)}
            />
          </HamburguerButtonContainer>
        </MediaQuery>
        <MediaQuery minWidth={responsiveBreakpoint}>
          {" "}
          <BarButtonContainer>
            <ModeToggle mode={mode} setMode={setMode} />
            {getAuthenticatedSection(BarAuthenticatedSectionContainer)}
          </BarButtonContainer>
        </MediaQuery>
      </Container>
      {burguerOpen ? (
        <DrawerMenu>
          <ModeToggle mode={mode} setMode={setMode} />
          {getAuthenticatedSection(DrawerAuthenticatedSectionContainer)}
        </DrawerMenu>
      ) : null}
    </>
  );
*/

};
