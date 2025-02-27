import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";
import {
  AcceptFileMiddleware,
  WebhhookSignatureMiddlewareController,
} from "@edu-platform/common/platform/http-server/middleware";
import { AccessTokenMiddlewareController } from "adapters/middlewares/access-token";
import {
  CreateNewGeneratedActivityController,
  CreateNewStudentOutputController,
  GetGeneratedActivityByIdController,
  GetMyActivityByIdController,
  GetActivitiesController,
  GetStudentOutputByIdController,
  RegisterUserWebhook,
  UpdateStudentOutputAnswerController,
  UpdateStudentOutputReviewController,
  ListMyActivitiesController,
  UpdateMyActivityController,
} from "adapters/controllers";
import {
  CreateNewActivityUseCase,
  CreateNewGeneratedActivityUseCase,
  CreateNewStudentOutputUseCase,
  CreateUserUseCase,
  UpdateStudentOutputAnswerUseCase,
  UpdateStudentOutputReviewUseCase,
  UpdateMyActivityUseCase,
} from "application/use-cases";
import {
  UserRepository,
  StudentOutputsRepository,
  ActivitiesGeneratedRepository,
  ActivitiesRepository,
  ActivitiesReadRepository,
  StudentOutputsReadRepository,
} from "adapters/infrastructure/persistence";
import {
  AssetRepository,
  S3Service,
  TopicService,
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
  SQSService,
} from "@edu-platform/common/platform/services";
import { DomainServicesRegistry } from "domain/services";

import {
  GenerateActivityUseCase,
  GenerateReadingActivity,
} from "application/event-handlers";
import { SqsHandler } from "../adapters/sqs-entrypoint";
import { CreateNewActivityController } from "adapters/controllers/create-new-activity";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    createNewActivityController: awilix.asClass(CreateNewActivityController),
    createNewGeneratedActivityController: awilix.asClass(
      CreateNewGeneratedActivityController
    ),
    createNewStudentOutputController: awilix.asClass(
      CreateNewStudentOutputController
    ),
    updateStudentOutputAnswerController: awilix.asClass(
      UpdateStudentOutputAnswerController
    ),
    updateStudentOutputReviewController: awilix.asClass(
      UpdateStudentOutputReviewController
    ),
    getActivitiesController: awilix.asClass(GetActivitiesController),
    getGeneratedActivityByIdController: awilix.asClass(
      GetGeneratedActivityByIdController
    ),
    getMyActivityByIdController: awilix.asClass(GetMyActivityByIdController),
    getStudentOutputByIdController: awilix.asClass(
      GetStudentOutputByIdController
    ),
    listMyActivitiesController: awilix.asClass(ListMyActivitiesController),
    updateMyActivityController: awilix.asClass(UpdateMyActivityController),

    registerUserWebhook: awilix.asClass(RegisterUserWebhook),

    authMiddleware: awilix.asClass(AccessTokenMiddlewareController).classic(),
    webhookSignature: awilix
      .asClass(WebhhookSignatureMiddlewareController)
      .classic(),
    fileMiddleware: awilix.asValue(AcceptFileMiddleware), // objeto do multer
    /** #endregion */

    // use cases
    createNewActivityUseCase: awilix
      .asClass(CreateNewActivityUseCase)
      .classic(),
    createNewStudentOutputUseCase: awilix
      .asClass(CreateNewStudentOutputUseCase)
      .classic(),
    updateStudentOutputAnswerUseCase: awilix
      .asClass(UpdateStudentOutputAnswerUseCase)
      .classic(),
    updateStudentOutputReviewUseCase: awilix
      .asClass(UpdateStudentOutputReviewUseCase)
      .classic(),
    signUpUseCase: awilix.asClass(CreateUserUseCase).classic(),
    createNewGeneratedActivityUseCase: awilix
      .asClass(CreateNewGeneratedActivityUseCase)
      .classic(),
    updateMyActivityUseCase: awilix.asClass(UpdateMyActivityUseCase).classic(),

    // services
    // keycloakAdmin: awilix.asClass(KeycloakAdmin),
    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),
    tokenService: awilix.asClass(JWTTokenService).singleton(),
    assetRepository: awilix.asClass(AssetRepository),
    storageService: awilix.asClass(S3Service).classic(),
    topicService: awilix.asClass(TopicService).classic(),
    sqsService: awilix.asClass(SQSService).classic(),

    domainServiceRegistry: awilix.asClass(DomainServicesRegistry).classic(),

    // repositories
    userRepository: awilix.asClass(UserRepository).classic(),
    activitiesGeneratedRepository: awilix
      .asClass(ActivitiesGeneratedRepository)
      .classic(),
    activitiesRepository: awilix.asClass(ActivitiesRepository).classic(),
    activitiesReadRepository: awilix
      .asClass(ActivitiesReadRepository)
      .classic(),
    studentOutputsRepository: awilix
      .asClass(StudentOutputsRepository)
      .classic(),
    studentOutputsReadRepository: awilix
      .asClass(StudentOutputsReadRepository)
      .classic(),

    sqsHandler: awilix.asClass(SqsHandler).classic(),

    generateActivityUseCase: awilix.asClass(GenerateActivityUseCase).classic(),
    readingStrategy: awilix.asClass(GenerateReadingActivity).classic(),
  });
};
