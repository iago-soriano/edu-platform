import dotenv from "dotenv";
dotenv.config(); // call this before importing main, because that will use env variables

import * as awilix from "awilix";

import {
  UserRepository,
  StudentOutputsRepository,
  ActivitiesRepository,
  ActivitiesReadRepository,
  CollectionsRepository,
  CollectionsReadRepository,
  NotificationsRepository,
  NotificationsReadRepository,
} from "@core/infrastructure/persistence";
import {
  AssetRepository,
  S3Service,
  TopicService,
  BCryptEncryptionService,
  EmailService,
  JWTTokenService,
} from "@edu-platform/common/platform/services";
import { DomainServicesRegistry } from "core/domain/services";

export const registerDependencies = (coreContainer: awilix.AwilixContainer) => {
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
    coreUserRepository: awilix.asClass(UserRepository).classic(),
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
