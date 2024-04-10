import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { DomainEvent } from "../domain/abstract";

export interface IDomainServiceRegistry {
  publishDomainEvent: (event: DomainEvent) => Promise<void>;
  uploadActivityContent: () => Promise<void>;
}

export class DomainServicesRegistry implements IDomainServiceRegistry {
  private _snsClient;
  constructor() {
    this._snsClient = new SNSClient({});
  }
  async publishDomainEvent(event: DomainEvent) {
    if (!process.env.DOMAIN_SNS_TOPIC_ARN)
      throw new Error("domain SNS topic arn not present");
    if (process.env.DOMAIN_SNS_TOPIC_ARN === "debug") return;

    await this._snsClient.send(
      new PublishCommand({
        MessageAttributes: {
          eventType: {
            StringValue: event.messageAttributes.eventType,
            DataType: "STRING_VALUE",
          },
        },
        Message: event.payload,
        TopicArn: process.env.DOMAIN_SNS_TOPIC_ARN,
      })
    );
  }

  async uploadActivityContent() {}
}
