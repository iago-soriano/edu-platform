import { ActivityVersion, Collection, User } from ".";

export class Activity {
  constructor(id?: number) {
    this.id = id || 0;
  }

  public id!: number;
  public author!: User;
  public collection!: Collection;
  public lastVersion!: ActivityVersion;
  public draftVersion!: ActivityVersion;
}
