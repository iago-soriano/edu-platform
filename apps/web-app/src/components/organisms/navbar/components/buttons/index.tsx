import { Icons } from "@components";
import { AbstractNavbarButton, NavbarButtonProps } from "./common";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Router } from "@infrastructure";

export const NavButton = ({
  highlighted,
  href,
  children,
  className,
}: {
  highlighted?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const hStyles = highlighted ? "text-accent font-bold" : "";
  return (
    <Link
      href={href}
      className={twMerge(
        "my-0 mx-auto flex h-full items-center text-center justify-center cursor-pointer hover:opacity-70 px-2",
        hStyles,
        className
      )}
    >
      {children}
    </Link>
  );
};

export const HomeButton = ({ currentPath, Component }: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/home"
    label="Home"
    currentPath={currentPath}
    Component={Component}
  />
);

export const TeacherAreaButton = ({
  currentPath,
  Component,
  isHighlighted,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path={Router.teacherHome}
    label="Área do Professor"
    currentPath={currentPath}
    Component={Component}
    isHighlighted={isHighlighted}
  />
);

export const StudentAreaButton = ({
  currentPath,
  Component,
  isHighlighted,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path={Router.studentHome}
    label="Área do Estudante"
    currentPath={currentPath}
    Component={Component}
    isHighlighted={isHighlighted}
  />
);

export const CollectionsButton = ({
  currentPath,
  Component,
  isHighlighted,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/collections?isOwner=true"
    label="Coleções"
    currentPath={currentPath}
    Component={Component}
    isHighlighted={isHighlighted}
  />
);

export const MyProfileButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/auth/my-profile"
    label="Minha conta"
    currentPath={currentPath}
    Component={Component}
  />
);

export const SignInButton = ({ currentPath, Component }: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/auth/sign-in"
    label="Entrar"
    currentPath={currentPath}
    Component={Component}
    icon={<Icons.USER />}
  />
);

export const SignUpButton = ({ currentPath, Component }: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/auth/sign-up"
    label="Cadastrar"
    currentPath={currentPath}
    Component={Component}
  />
);

export const SignOutButton = ({ signOut }) => (
  <button
    onClick={signOut}
    className="hover:underline hover:opacity-70 hover:cursor-pointer flex flex-row items-center mx-auto w-full justify-center"
  >
    <Icons.SIGN_OUT className="py-3" />
    <span className="p-3 inline-block">Sair</span>
  </button>
);
