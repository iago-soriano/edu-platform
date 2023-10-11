import {
    IUserRepository,
    ITokenRepository,
    IUseCase,
    IIdGenerator,
    IEmailService,
    TokenType,
  } from "@interfaces";
  import {
    UserNotFoundError,
  } from "@edu-platform/common/errors";
  
  type InputParams = {
    email: string;
  };
  
  type Return = void;
  
  export type IChangePasswordRequestUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IChangePasswordRequestUseCase {
    constructor(
      private userRepository: IUserRepository,
      private idService: IIdGenerator,
      private emailService: IEmailService,
      private tokenRepository: ITokenRepository
    ) {}
  
    async execute({ email }: InputParams) {
      const user = await this.userRepository.getUserByEmail(
        email
      );
  
      if (!user) throw new UserNotFoundError();
  
      const changePasswordToken = this.idService.getId();

      await this.tokenRepository.insertToken({
        token: changePasswordToken,
        userId: user.id,
        type: TokenType.ChangePasswordRequest,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3),
      })

      await this.emailService.sendForgotPasswordEmail({
        destination: email,
        url: `${process.env.WEB_APP_URL}/change-password?changePasswordToken=${changePasswordToken}`
      });
    }
  }
  
  export default UseCase;
  