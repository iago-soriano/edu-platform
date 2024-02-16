import { ActivityVersion, Collection, User } from ".";

export enum OutputStatus {
  Draft = "Draft",
  Completed = "Completed",
}

export class StudentOutput {
  public id?: number;
  public status?: OutputStatus;
  public user!: User;
  public version!: ActivityVersion;
}
