import * as awilix from "awilix";
import {
  SignInController,
  SignOutController,
  SignUpController,
  ProviderSignInController,
  ProviderSignUpController,
  VerifyAccountController,
  ChangePasswordRequestController,
  ChangePasswordController,
  CheckChangePasswordTokenRequestController,
  GetTopicsController,
  SaveActivityController,
} from "@controllers";
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  ProviderSignInUseCase,
  ProviderSignUpUseCase,
  VerifyAccountUseCase,
  ChangePasswordRequestUseCase,
  ChangePasswordUseCase,
  CheckChangePasswordTokenRequestUseCase,
  SaveActivityUseCase,
  GetTopicsUseCase,
} from "@use-cases";
import {
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
  IdGeneratorService,
  UserRepository,
  TokenRepository,
  AssetRepository,
} from "@infrastructure";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    signInController: awilix.asClass(SignInController).classic(),
    signOutController: awilix.asClass(SignOutController).classic(),
    signUpController: awilix.asClass(SignUpController).classic(),
    providerSignUpController: awilix
      .asClass(ProviderSignUpController)
      .classic(),
    providerSignInController: awilix
      .asClass(ProviderSignInController)
      .classic(),
    verifyAccountController: awilix.asClass(VerifyAccountController).classic(),
    changePasswordRequestController: awilix
      .asClass(ChangePasswordRequestController)
      .classic(),
    changePasswordController: awilix
      .asClass(ChangePasswordController)
      .classic(),
    checkChangePasswordTokenRequestController: awilix
      .asClass(CheckChangePasswordTokenRequestController)
      .classic(),
    saveActivityController: awilix.asClass(SaveActivityController).classic(),
    getTopicsController: awilix.asClass(GetTopicsController).classic(),

    // services
    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),
    idService: awilix.asClass(IdGeneratorService),
    tokenService: awilix.asClass(JWTTokenService).singleton(),
    assetRepository: awilix.asClass(AssetRepository),

    // use cases
    signInUseCase: awilix.asClass(SignInUseCase).classic(),
    signOutUseCase: awilix.asClass(SignOutUseCase).classic(),
    signUpUseCase: awilix.asClass(SignUpUseCase).classic(),
    providerSignUpUseCase: awilix.asClass(ProviderSignUpUseCase).classic(),
    providerSignInUseCase: awilix.asClass(ProviderSignInUseCase).classic(),
    verifyAccountUseCase: awilix.asClass(VerifyAccountUseCase).classic(),
    changePasswordRequestUseCase: awilix
      .asClass(ChangePasswordRequestUseCase)
      .classic(),
    changePasswordUseCase: awilix.asClass(ChangePasswordUseCase).classic(),
    checkChangePasswordTokenRequestUseCase: awilix
      .asClass(CheckChangePasswordTokenRequestUseCase)
      .classic(),
    insertActivityUseCase: awilix.asClass(SaveActivityUseCase).classic(),
    getTopicsUseCase: awilix.asClass(GetTopicsUseCase).classic(),

    // repositories
    userRepository: awilix.asClass(UserRepository).classic(),
    tokenRepository: awilix.asClass(TokenRepository).classic(),
  });
};
