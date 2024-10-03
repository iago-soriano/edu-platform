import { Entity } from "@edu-platform/common/platform";

export class ActivityBlock extends Entity {
  constructor() {
    super();
  }

  public id!: string;
  public type!: string;
  public data!: any;
}
