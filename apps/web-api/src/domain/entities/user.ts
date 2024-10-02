import { Entity } from '@edu-platform/common/platform';

export class User extends Entity {
  constructor(
    public id: string,
    public email: string,
    public counter: number,
  ) {
    super();
  }
}
