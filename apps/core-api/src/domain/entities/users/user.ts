import { Entity } from "@edu-platform/common/platform";

export class User extends Entity {
  constructor(
    public id: number,
    public name?: string,
    public email?: string
  ) {
    super();
  }
}
