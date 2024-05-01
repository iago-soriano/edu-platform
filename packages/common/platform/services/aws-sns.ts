import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { ITopicService } from "./interfaces";
import { DomainEvent } from "../interfaces/domain";

export class TopicService implements ITopicService {
  private _snsClient;
  constructor() {
    this._snsClient = new SNSClient();
  }

  public async send(event: DomainEvent<unknown>, topicArn: string) {
    if (topicArn === "debug") return;
    await this._snsClient.send(
      new PublishCommand({
        MessageAttributes: {
          eventType: {
            StringValue: event.eventType,
            DataType: "String",
          },
        },
        Message: JSON.stringify(event.payload),
        TopicArn: topicArn,
      })
    );
  }
}
