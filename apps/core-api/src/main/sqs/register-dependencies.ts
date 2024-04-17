import * as awilix from "awilix";
import {
  ActivityPublishedUseCase,
  FeedbackPublishedUseCase,
  StudentOutputPublishedUseCase,
  UserCreatedUseCase,
} from "@application/use-cases";
import { SqsHandler } from "@sqs-handlers";

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
