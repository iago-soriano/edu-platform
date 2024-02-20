import {
  ActivityVersionHasTooManyTopics,
  DomainRules,
  ActivityTitleIsTooLong,
  ActivityDescriptionIsTooLong,
  ActivityDescriptionIsTooShort,
  ActivityTitleIsTooShort,
} from "@edu-platform/common";
import { Content, Question, Activity } from ".";

export enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}

export type Elements = { content: Content | null; question: Question | null }[];

export class ActivityVersion {
  public id!: number;
  public title!: string;
  public description!: string;
  public topics!: string;
  public version!: number;
  public status!: VersionStatus;
  public activity!: Activity;
  // public elements: Elements = [];
  public contents: Content[] = [];
  public questions: Question[] = [];
  public updatedAt!: Date;

  constructor(id?: number) {
    this.id = id || 0;
  }

  validateTitle() {
    if (!this.title) return;
    if (this.title.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH) {
      throw new ActivityTitleIsTooLong();
    } else if (this.title.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH) {
      throw new ActivityTitleIsTooShort();
    }
  }

  validateDescription() {
    if (!this.description) return;
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
}
