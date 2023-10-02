import { ButtonStyled } from "./styles";

interface IFormButtonProps {
  loading?: boolean;
  onClick?: any;
  label: string;
  variant?: string;
  disabled?: boolean;
}
export const FormButton = ({
  loading,
  label,
  disabled,
  ...rest
}: IFormButtonProps) => {
  return (
    <ButtonStyled type="submit" {...rest} disabled={loading || disabled}>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>{label}</>
      )}
    </ButtonStyled>
  );
};
