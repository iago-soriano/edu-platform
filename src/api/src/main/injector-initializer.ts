import * as awilix from "awilix";
import {
  SignInController,
  SignOutController,
  SignUpController
} from '@presentation/controllers';
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase
} from '@application/use-cases';
import { 
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
  IdGeneratorService,
  UserRepository,
  nedDb
} from '@application/infrastructure';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    // controllers
    signInController: awilix.asClass(SignInController),
    signOutController: awilix.asClass(SignOutController),
    signUpController: awilix.asClass(SignUpController),

    // services
    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),
    idService: awilix.asClass(IdGeneratorService),
    tokenService: awilix.asClass(JWTTokenService),

    // use cases
    signInUseCase: awilix.asClass(SignInUseCase),
    signOutUseCase: awilix.asClass(SignOutUseCase),
    signUpUseCase: awilix.asClass(SignUpUseCase),

    // repositories
    base: awilix.asValue(nedDb),
    userRepository: awilix.asClass(UserRepository),
  });
};
