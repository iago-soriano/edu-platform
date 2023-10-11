import { Spinner } from '@components';
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
        <Spinner/>
      ) : (
        <>{label}</>
      )}
    </ButtonStyled>
  );
};
