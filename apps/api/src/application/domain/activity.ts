import { ActivityVersion, Collection, User } from ".";

export class Activity {
  public id!: number;
  public author!: User;
  public collection!: Collection;
  public lastVersion!: ActivityVersion;
  public draftVersion!: ActivityVersion;
}
