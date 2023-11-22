import { ProviderButtonContainer } from "./styles";
import { VerticalSeparator } from "components/separator";

export interface IProviderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  provider: string;
  label: string;
  isLoading: boolean;
}
export const ProviderSignInButton = ({
  icon,
  label,
  onClick,
  isLoading,
}: IProviderButtonProps) => {
  return (
    <button
      className="w-full rounded p-2 flex justify-start items-center mb-4 bg-surface3 border-text1 border cursor-pointer h-16"
      onClick={onClick}
    >
      {icon}
      <VerticalSeparator />
      {isLoading ? (
        <span className="p-1 px-5">Carregando...</span>
      ) : (
        <span className="p-1 px-5">{label}</span>
      )}
    </button>
  );
};
