import {
  IActivityPublishedUseCase,
  IFeedbackPublishedUseCase,
  IStudentOutputPublishedUseCase,
  IUserCreatedUseCase,
} from "application/use-cases/event-handlers";
import { DomainEvent } from "@edu-platform/common/platform/interfaces";

export class SqsHandler {
  constructor(
    private activityPublishedUseCase: IActivityPublishedUseCase,
    private feedbackPublishedUseCase: IFeedbackPublishedUseCase,
    private studentOutputPublishedUseCase: IStudentOutputPublishedUseCase,
    private userCreatedUseCase: IUserCreatedUseCase
  ) {}
  async execute(evnt: DomainEvent<any>) {
    switch (evnt.eventType) {
      case "UserCreated":
        await this.userCreatedUseCase.execute(evnt);
        break;

      default:
        break;
    }
  }
}
