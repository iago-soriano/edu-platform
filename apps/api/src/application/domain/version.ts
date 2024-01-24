import {
  ActivityVersionHasTooManyTopics,
  DomainRules,
  ActivityTitleIsTooLong,
  ActivityDescriptionIsTooLong,
  ActivityDescriptionIsTooShort,
  ActivityTitleIsTooShort,
} from "@edu-platform/common";
import { ActivityVersionSelectDTO } from "@interfaces";
import { VersionDTO, parseVersionStatus } from "@dto";

export enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

export class ActivityVersion {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public topics: string,
    public version: number,
    public status: VersionStatus,
    public activityId: number
  ) {}

  validateTitle() {
    if (this.title.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH) {
      throw new ActivityTitleIsTooLong();
    } else if (this.title.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH) {
      throw new ActivityTitleIsTooShort();
    }
  }

  validateDescription() {
    if (this.description.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH) {
      throw new ActivityDescriptionIsTooLong();
    } else if (
      this.description.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH
    ) {
      throw new ActivityDescriptionIsTooShort();
    }
  }

  validateTopics() {
    const topicsArray = this.topics.split(",");
    if (topicsArray.length > DomainRules.ACTIVITY.TOPICS.MAX_COUNT) {
      throw new ActivityVersionHasTooManyTopics();
    }
  }

  static mapFromDto(dto: VersionDTO) {
    return new ActivityVersion(
      dto.id || 0,
      dto.title || "",
      dto.description || "",
      dto.topics || "",
      dto.version || 0,
      parseVersionStatus(dto.status) || VersionStatus.Draft,
      dto.activityId || 0
    );
  }

  static mapFromDatabaseDto(dto: ActivityVersionSelectDTO) {
    return new ActivityVersion(
      dto.id,
      dto.title || "",
      dto.description || "",
      dto.topics || "",
      dto.version || 0,
      parseVersionStatus(dto.status) || VersionStatus.Draft,
      dto.activityId || 0
    );
  }
}
