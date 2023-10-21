import { Icons } from "@components";
import { AbstractNavbarButton, NavbarButtonProps } from "./common";
import { NavButtonStyled, SignOutButtonStyled } from "./styles";

export const ProductButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/product"
    label="Home"
    currentPath={currentPath}
    Component={Component}
  />
);

export const DashboardButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/dashboard"
    label="Minha Área"
    currentPath={currentPath}
    Component={Component}
  />
);

export const NewActivityButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/activity/new"
    label="Nova Atividade"
    currentPath={currentPath}
    Component={Component}
  />
);

export const HowItWorksButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/how-it-works"
    label="Como funciona"
    currentPath={currentPath}
    Component={Component}
  />
);

export const MyProfileButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/my-profile"
    label="Minha conta"
    currentPath={currentPath}
    Component={Component}
  />
);

export const SignInButton = ({ currentPath, Component }: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/sign-in"
    label="Entrar"
    currentPath={currentPath}
    Component={Component}
    icon={<Icons.USER />}
  />
);

export const SignUpButton = ({ currentPath, Component }: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/sign-up"
    label="Cadastrar"
    currentPath={currentPath}
    Component={Component}
  />
);

export const SignOutButton = ({ signOut }) => (
  <SignOutButtonStyled onClick={signOut}>
    <Icons.EXIT />
    <span>Sair</span>
  </SignOutButtonStyled>
);

export { NavButtonStyled };
