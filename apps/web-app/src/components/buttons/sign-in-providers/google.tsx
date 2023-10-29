import { ProviderSignInButton } from "./base";

export const GoogleSignInButton = ({ onClick, isLoading }) => {
  return (
    <ProviderSignInButton
      iconSrc={"/assets/images/google_icon.svg"}
      provider={"google"}
      label="Entrar com a conta do Google"
      onClick={onClick}
      isLoading={isLoading}
    />
  );
};
