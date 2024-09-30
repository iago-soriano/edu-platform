import {
  IActivityPublishedUseCase,
  IFeedbackPublishedUseCase,
  IStudentOutputPublishedUseCase,
  IUserCreatedUseCase,
} from "core/application/event-handlers";
import { DomainEvent } from "@edu-platform/common/platform/interfaces";
import { SQSHandler, SQSEvent } from "aws-lambda";

export class SqsHandler {
  constructor(
    private activityPublishedUseCase: IActivityPublishedUseCase,
    private feedbackPublishedUseCase: IFeedbackPublishedUseCase,
    private studentOutputPublishedUseCase: IStudentOutputPublishedUseCase,
    private userCreatedUseCase: IUserCreatedUseCase
  ) {}
  async execute(evnt: SQSEvent) {
    for (const record of evnt.Records) {
      const evntType = record.messageAttributes["eventType"].stringValue;
      const payload = JSON.parse(record.body);

      console.log("Event:", { evntType, payload });

      switch (evntType) {
        case "UserCreated":
          await this.userCreatedUseCase.execute({
            id: payload["id"],
            email: payload["email"],
            name: payload["name"],
          });
          break;

        default:
          break;
      }
    }
  }
}
