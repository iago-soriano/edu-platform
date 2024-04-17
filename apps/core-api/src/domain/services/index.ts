import { DomainEvent } from "@edu-platform/common/platform";
import { ITopicService, IStorageService } from "@edu-platform/common/platform";

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
    private topicService: ITopicService,
    private domainTopicArn: string
  ) {}
  async publishToDomainTopic(event: DomainEvent) {
    if (!this.domainTopicArn)
      throw new Error("domain SNS topic arn not present");
    if (this.domainTopicArn === "debug") return;

    await this.topicService.send(event, this.domainTopicArn);
  }

  _getContentFileUrl(activityId: string, versionId: string, contentId: number) {
    return `${activityId}/${versionId}-${contentId}`;
  }

  async uploadActivityContent(
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
