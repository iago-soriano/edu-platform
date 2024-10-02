import { Entity } from '@edu-platform/common/platform';

export class Answer extends Entity {
  constructor() {
    super();
  }

  public id!: string;
  public blockId!: string;
  public answer!: string;
  public review!: string;
}
