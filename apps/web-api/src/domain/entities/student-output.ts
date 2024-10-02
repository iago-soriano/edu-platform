import { Entity } from '@edu-platform/common/platform';

export class StudentOutput extends Entity {
  constructor() {
    super();
  }

  public id!: string;
  public requestingUserId!: string;
  public activityId!: string;
  public studentEmail!: string;
  public status!: string;
  //public answers: Answer[];
}
