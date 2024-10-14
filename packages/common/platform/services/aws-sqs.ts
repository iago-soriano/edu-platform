import { SQS, SendMessageRequest } from "@aws-sdk/client-sqs";
import { ISQSService } from "./interfaces";
import { DomainEvent } from "../interfaces/domain";

export class SQSService implements ISQSService {
  private _sqsClient;
  constructor() {
    this._sqsClient = new SQS();
  }

  public async send(event: DomainEvent<unknown>) {
    if (!process.env.QUEUE_URL?.length) return;

    const message: SendMessageRequest = {
      MessageBody: JSON.stringify({
        eventType: event.eventType,
        payload: event.payload,
      }),
      QueueUrl: process.env.QUEUE_URL,
    };
    await this._sqsClient.sendMessage(message);
  }
}
