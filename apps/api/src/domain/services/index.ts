import { DomainEvent } from "@domain/abstract";
import { ITopicService, IStorageService } from "@application/interfaces";
import { mainContainer } from "index";

export interface IDomainServiceRegistry {
  publishToDomainTopic: (event: DomainEvent) => Promise<void>;
  uploadActivityContent: (
    activityId: string,
    versionId: string,
    contentId: number,
    file: Express.Multer.File
  ) => Promise<string>;
}

export class DomainServicesRegistry implements IDomainServiceRegistry {
  constructor(
    private storageService: IStorageService,
    private topicService: ITopicService
  ) {}
  async publishToDomainTopic(event: DomainEvent) {
    if (!process.env.DOMAIN_SNS_TOPIC_ARN)
      throw new Error("domain SNS topic arn not present");
    if (process.env.DOMAIN_SNS_TOPIC_ARN === "debug") return;

    await this.topicService.send(event, process.env.DOMAIN_SNS_TOPIC_ARN);
  }

  _getContentFileUrl(activityId: string, versionId: string, contentId: number) {
    return `${activityId}/${versionId}-${contentId}`;
  }

  uploadActivityContent(
    activityId: string,
    versionId: string,
    contentId: number,
    file: Express.Multer.File
  ) {
    return this.storageService.uploadFile(
      this._getContentFileUrl(activityId, versionId, contentId),
      file
    );
  }
}

export const resolveDomainServicesRegistry = () =>
  mainContainer.resolve<IDomainServiceRegistry>("domainServiceRegistry");
