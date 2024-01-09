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

export const MyActivitiesButton = ({
  currentPath,
  Component,
  isHighlighted,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/dashboard/my-activities/draft"
    label="Minhas atividades"
    currentPath={currentPath}
    Component={Component}
    isHighlighted={isHighlighted}
  />
);

export const StudentOutputsButton = ({
  currentPath,
  Component,
  isHighlighted,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/dashboard/student-outputs"
    label="Produções dos Estudantes"
    currentPath={currentPath}
    Component={Component}
    isHighlighted={isHighlighted}
  />
);

export const HowItWorksButton = ({
  currentPath,
  Component,
}: NavbarButtonProps) => (
  <AbstractNavbarButton
    path="/faq"
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
