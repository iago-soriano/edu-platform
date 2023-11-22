import { ProviderSignInButton } from "./base";
import Image from "next/image";

export const GoogleSignInButton = ({ onClick, isLoading }) => {
  return (
    <ProviderSignInButton
      icon={
        <Image
          width={40}
          height={40}
          src={"/assets/images/icons/google_icon.svg"}
          alt={"Entrar com o Google"}
        />
      }
      provider={"google"}
      label="Entrar com a conta do Google"
      onClick={onClick}
      isLoading={isLoading}
    />
  );
};
