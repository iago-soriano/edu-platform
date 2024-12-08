import { SQSHandler, SQSEvent } from "aws-lambda";
import { IGenerateActivityUseCase } from "application/event-handlers";

export class SqsHandler {
  constructor(private generateActivityUseCase: IGenerateActivityUseCase) {}
  async execute(evnt: SQSEvent) {
    for (const record of evnt.Records) {
      const evntType = record.messageAttributes["eventType"].stringValue;
      const payload = JSON.parse(record.body);

      switch (evntType) {
        case "ActivityCreated":
          await this.generateActivityUseCase.execute({
            ...payload,
          });
          break;

        default:
          break;
      }
    }
  }
}
