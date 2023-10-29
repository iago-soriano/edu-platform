import { Icons } from "@components";
import { AbstractNavbarButton, NavbarButtonProps } from "./common";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

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
  const hStyles = highlighted ? "border-b-4 border-acc text-acc font-bold" : "";
  return (
    <Link
      href={href}
      className={twMerge(
        "my-0 mx-auto flex h-full items-center text-center justify-center cursor-pointer hover:bg-slate-400 focus:bg-slate-400",
        hStyles,
        className
      )}
    >
      {children}
    </Link>
  );
};

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
  <button
    onClick={signOut}
    className="hover:underline hover:cursor-pointer flex flex-row items-center mx-auto w-full justify-center"
  >
    <Icons.EXIT className="py-3" />
    <span className="p-3 inline-block">Sair</span>
  </button>
);
