import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { ITopicService } from "@application/interfaces";
import { DomainEvent } from "@domain/abstract";

export class TopicService implements ITopicService {
  private _snsClient;
  constructor() {
    this._snsClient = new SNSClient({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
      region: process.env.AWS_REGION,
    });
  }

  public async send(event: DomainEvent, topicArn: string) {
    await this._snsClient.send(
      new PublishCommand({
        MessageAttributes: {
          eventType: {
            StringValue: event.eventType,
            DataType: "STRING_VALUE",
          },
        },
        Message: JSON.stringify(event.payload),
        TopicArn: topicArn,
      })
    );
  }
}
