import * as awilix from "awilix";
import {
  ActivityPublishedUseCase,
  FeedbackPublishedUseCase,
  StudentOutputPublishedUseCase,
  UserCreatedUseCase,
} from "core/application/event-handlers";
import { SqsHandler } from "../adapters/sqs-entrypoint";

export const registerDependencies = (container: awilix.AwilixContainer) => {
  container.register({
    sqsHandler: awilix.asClass(SqsHandler).classic(),

    activityPublishedUseCase: awilix
      .asClass(ActivityPublishedUseCase)
      .classic(),
    feedbackPublishedUseCase: awilix
      .asClass(FeedbackPublishedUseCase)
      .classic(),
    studentOutputPublishedUseCase: awilix
      .asClass(StudentOutputPublishedUseCase)
      .classic(),
    userCreatedUseCase: awilix.asClass(UserCreatedUseCase).classic(),
  });
};
