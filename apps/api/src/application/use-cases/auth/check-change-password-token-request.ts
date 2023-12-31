import { ITokenRepository, IUseCase, TokenType } from "@interfaces";

type InputParams = {
  token: string;
};

type Return = boolean;

export type ICheckChangePasswordTokenRequestUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements ICheckChangePasswordTokenRequestUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ token }: InputParams) {
    const changePasswordRequestToken =
      await this.tokenRepository.getTokenByTokenValue(
        token,
        "ChangePasswordRequest"
      );

    if (
      changePasswordRequestToken &&
      changePasswordRequestToken.expiresAt > Date.now()
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default UseCase;
