import { Entity } from "@edu-platform/common/platform";

export class User extends Entity {
  constructor(
    public id: string,
    public name?: string,
    public email?: string
  ) {
    super();
  }
}
