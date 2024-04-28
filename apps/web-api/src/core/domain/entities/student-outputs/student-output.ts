import { CollectionArray, Entity } from "@edu-platform/common/platform";
import { ActivityVersion, Collection, StudentAnswer, User } from "..";
import { OutputStatus } from "./enums";

export { OutputStatus } from "./enums";

export class StudentOutput extends Entity {
  constructor(id: number) {
    super();
    this.id = id;
  }
  public id: number;
  public studentId!: number;
  public versionId!: number;
  public activityAuthorId!: number;
  public statusOutput!: OutputStatus;
  public statusFeedback!: OutputStatus;
  public answers!: CollectionArray<StudentAnswer>;
}
