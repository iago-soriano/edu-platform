import dotenv from 'dotenv';
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from 'awilix';
import {
  AuthenticationMiddlewareController,
  AcceptFileMiddleware,
} from '@edu-platform/common/platform/http-server/middleware';
import { CreateNewActivityController } from 'adapters/controllers';
import {
  CreateNewActivityUseCase,
  CreateStudentOutputUseCase,
} from 'application/use-cases';
import {
  UserRepository,
  StudentOutputsRepository,
  ActivitiesRepository,
  ActivitiesReadRepository,
} from 'adapters/infrastructure/persistence';
import {
  AssetRepository,
  S3Service,
  TopicService,
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
} from '@edu-platform/common/platform/services';
import { DomainServicesRegistry } from 'domain/services';

import { ActivityGeneratedUseCase } from 'application/event-handlers';
import { SqsHandler } from '../adapters/sqs-entrypoint';

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    createNewActivityController: awilix.asClass(CreateNewActivityController),

    authMiddleware: awilix
      .asClass(AuthenticationMiddlewareController)
      .classic(),
    fileMiddleware: awilix.asValue(AcceptFileMiddleware), // objeto do multer
    /** #endregion */

    // use cases
    createNewActivityUseCase: awilix
      .asClass(CreateNewActivityUseCase)
      .classic(),
    createStudentOutputUseCase: awilix
      .asClass(CreateStudentOutputUseCase)
      .classic(),

    domainTopicArn: awilix.asValue(process.env.DOMAIN_SNS_TOPIC_ARN),

    encryptionService: awilix.asClass(BCryptEncryptionService),
    emailService: awilix.asClass(EmailService),
    tokenService: awilix.asClass(JWTTokenService).singleton(),
    assetRepository: awilix.asClass(AssetRepository),
    storageService: awilix.asClass(S3Service).classic(),
    topicService: awilix.asClass(TopicService).classic(),

    domainServiceRegistry: awilix.asClass(DomainServicesRegistry).classic(),

    // repositories
    userRepository: awilix.asClass(UserRepository).classic(),
    activitiesRepository: awilix.asClass(ActivitiesRepository).classic(),
    activitiesReadRepository: awilix
      .asClass(ActivitiesReadRepository)
      .classic(),
    studentOutputsRepository: awilix
      .asClass(StudentOutputsRepository)
      .classic(),

    sqsHandler: awilix.asClass(SqsHandler).classic(),

    activityGeneratedUseCase: awilix
      .asClass(ActivityGeneratedUseCase)
      .classic(),
  });
};
