import { Entity } from '@edu-platform/common/platform';

export class Activity extends Entity {
  constructor() {
    super();
  }

  public id!: string;
  public requestingUserId!: string;
  public language!: string;
  public topics!: string[];
  public format!: string;
  public level!: string;
  public status!: string;
}
