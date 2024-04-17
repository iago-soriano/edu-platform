import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";

import {
  UserRepository,
  TokenRepository,
  StudentOutputsRepository,
  ActivitiesRepository,
  ActivitiesReadRepository,
  CollectionsRepository,
  CollectionsReadRepository,
  NotificationsRepository,
  NotificationsReadRepository,
} from "@infrastructure/persistence";
import {
  AssetRepository,
  S3Service,
  TopicService,
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
} from "@edu-platform/common/platform/services";
import { DomainServicesRegistry } from "@domain/services";

export const registerCoreDependencies = (
  coreContainer: awilix.AwilixContainer
) => {
  coreContainer.register({
    // services
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
    tokenRepository: awilix.asClass(TokenRepository).classic(),
    activitiesRepository: awilix.asClass(ActivitiesRepository).classic(),
    activitiesReadRepository: awilix
      .asClass(ActivitiesReadRepository)
      .classic(),
    collectionsRepository: awilix.asClass(CollectionsRepository).classic(),
    collectionsReadRepository: awilix
      .asClass(CollectionsReadRepository)
      .classic(),
    studentOutputsRepository: awilix
      .asClass(StudentOutputsRepository)
      .classic(),
    notificationsRepository: awilix.asClass(NotificationsRepository).classic(),
    notificationsReadRepository: awilix
      .asClass(NotificationsReadRepository)
      .classic(),
  });
};
