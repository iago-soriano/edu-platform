import { ProviderSignInButton } from "./base";
import { Icons } from "../../icons";

export const CredentialsSignInButton = ({ onClick }) => {
  return (
    <ProviderSignInButton
      icon={
        <Icons.EMAIL
          size={40}
          style={{ opacity: 0.8, color: "hsl(350, 79%, 59%)" }}
        />
      }
      provider={"credenciais"}
      label="Entrar com e-mail e senha"
      onClick={onClick}
      isLoading={false}
    />
  );
};
