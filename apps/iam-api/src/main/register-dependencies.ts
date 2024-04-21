import * as awilix from "awilix";
import {
  SignInController,
  SignOutController,
  SignUpController,
  ProviderSignUpController,
  VerifyAccountController,
  ChangePasswordRequestController,
  ChangePasswordController,
  RefreshTokenController,
} from "@controllers";
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  ProviderSignUpUseCase,
  VerifyAccountUseCase,
  ChangePasswordRequestUseCase,
  ChangePasswordUseCase,
  RefreshTokenUseCase,
} from "@application/use-cases";
import {
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
  TopicService,
} from "@edu-platform/common/platform/services";
import { UserRepository, TokenRepository } from "@infrastructure/persistence";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    /** #region controllers */
    signInController: awilix.asClass(SignInController).classic(),
    signOutController: awilix.asClass(SignOutController).classic(),
    signUpController: awilix.asClass(SignUpController).classic(),
    providerSignUpController: awilix
      .asClass(ProviderSignUpController)
      .classic(),
    verifyAccountController: awilix.asClass(VerifyAccountController).classic(),
    changePasswordRequestController: awilix
      .asClass(ChangePasswordRequestController)
      .classic(),
    changePasswordController: awilix
      .asClass(ChangePasswordController)
      .classic(),
    refreshTokenController: awilix.asClass(RefreshTokenController).classic(),

    /** #endregion */

    // use cases
    signInUseCase: awilix.asClass(SignInUseCase).classic(),
    signOutUseCase: awilix.asClass(SignOutUseCase).classic(),
    signUpUseCase: awilix.asClass(SignUpUseCase).classic(),
    providerSignUpUseCase: awilix.asClass(ProviderSignUpUseCase).classic(),
    verifyAccountUseCase: awilix.asClass(VerifyAccountUseCase).classic(),
    changePasswordRequestUseCase: awilix
      .asClass(ChangePasswordRequestUseCase)
      .classic(),
    changePasswordUseCase: awilix.asClass(ChangePasswordUseCase).classic(),
    refreshTokenUseCase: awilix.asClass(RefreshTokenUseCase).classic(),

    // services
    domainTopicArn: awilix.asValue(process.env.DOMAIN_SNS_TOPIC_ARN),

    topicService: awilix.asClass(TopicService).classic(),
    tokenService: awilix.asClass(JWTTokenService).singleton(),
    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),

    // repositories
    userRepository: awilix.asClass(UserRepository).classic(),
    tokenRepository: awilix.asClass(TokenRepository).classic(),
  });
};
