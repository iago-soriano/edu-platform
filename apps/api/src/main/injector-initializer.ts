import * as awilix from "awilix";
import {
  SignInController,
  SignOutController,
  SignUpController,
  ProviderSignInController,
  ProviderSignUpController
} from '@controllers';
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  ProviderSignInUseCase,
  ProviderSignUpUseCase
} from '@use-cases';
import { 
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
  IdGeneratorService,
  UserRepository,
  TokenRepository,
  AssetRepository,
  nedDb
} from '@infrastructure';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    signInController: awilix.asClass(SignInController).classic(),
    signOutController: awilix.asClass(SignOutController).classic(),
    signUpController: awilix.asClass(SignUpController).classic(),
    providerSignUpController: awilix.asClass(ProviderSignUpController).classic(),
    providerSignInController: awilix.asClass(ProviderSignInController).classic(),

    // services
    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),
    idService: awilix.asClass(IdGeneratorService),
    tokenService: awilix.asClass(JWTTokenService),
    assetRepository: awilix.asClass(AssetRepository),

    // use cases
    signInUseCase: awilix.asClass(SignInUseCase).classic(),
    signOutUseCase: awilix.asClass(SignOutUseCase).classic(),
    signUpUseCase: awilix.asClass(SignUpUseCase).classic(),
    providerSignUpUseCase: awilix.asClass(ProviderSignUpUseCase).classic(),
    providerSignInUseCase: awilix.asClass(ProviderSignInUseCase).classic(),

    // repositories
    baseDb: awilix.asValue(nedDb),
    userRepository: awilix.asClass(UserRepository).classic(),
    tokenRepository: awilix.asClass(TokenRepository).classic(),
  });
};
