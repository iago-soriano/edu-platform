import { AbstractNavbarButton, NavbarButtonProps } from "./abstract-button"

export const HomeButton = ({
  currentPath,
  Component
}: NavbarButtonProps) => (
  <AbstractNavbarButton 
    path="/"
    label="Home"
    currentPath={currentPath}
    Component={Component}
  />
);

export const SignInButton = ({
  currentPath,
  Component
}: NavbarButtonProps) => (
  <AbstractNavbarButton 
    path="/sign-in"
    label="Entrar"
    currentPath={currentPath}
    Component={Component}
  />
);

export const SignUpButton = ({
  currentPath,
  Component
}: NavbarButtonProps) => (
  <AbstractNavbarButton 
    path="/sign-up"
    label="Cadastrar"
    currentPath={currentPath}
    Component={Component}
  />
);

// export const buttonDefinitions: { [key: string]: ButtonDefinition } = {
//   home: {
//     path: '/',
//     label: 'Home',
//   },
//   howItWorks: {
//     path: '/howItWorks',
//     label: 'Como funciona',
//   },
//   createActivity: {
//     path: '/createActivity',
//     label: 'Criar atividade',
//   },
//   signUp: {
//     path: '/signUp',
//     label: 'Cadastrar',
//   },
//   signIn: {
//     path: '/signin',
//     label: 'Entrar',
//   },
//   dashboard: {
//     path: '/dashboard',
//     label: 'Minha área',
//   }
// }

