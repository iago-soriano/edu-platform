import React, { useEffect, useState } from "react";
import {
  Container,
  AuthenticatedSectionContainer,
  Button
} from "./styles";
import { SignInButton, SignUpButton, HomeButton, Logo } from "../components";

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
          <button onClick={signOut}>Sair</button>
        </AuthenticatedSectionContainer>
      );
    return (
      <AuthenticatedSectionContainer>
        <HomeButton
          currentPath={currentPath}
          Component={Button}
        />
          <button onClick={signOut}>Sair</button>

      </AuthenticatedSectionContainer>
    );
  };

  return(
    <Container>
      {modeToggle}
      {getAuthenticatedSection()}
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
