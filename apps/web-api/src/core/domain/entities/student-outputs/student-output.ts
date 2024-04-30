import { CollectionArray, Entity } from "@edu-platform/common/platform";
import { ActivityVersion, Collection, StudentAnswer, User } from "..";
import { OutputStatus } from "./enums";

export { OutputStatus } from "./enums";

export class StudentOutput extends Entity {
  public id: number;
  public studentId!: string;
  public versionId!: string;
  public activityAuthorId!: string;
  public outputStatus: OutputStatus;
  public feedbackStatus: OutputStatus;
  public answers!: CollectionArray<StudentAnswer>;

  constructor(
    id?: number,
    outputStatus?: OutputStatus,
    feedbackStatus?: OutputStatus
  ) {
    super();
    this.id = id || 0;
    this.outputStatus = outputStatus || OutputStatus.Draft;
    this.feedbackStatus = feedbackStatus || OutputStatus.Draft;
  }
}
