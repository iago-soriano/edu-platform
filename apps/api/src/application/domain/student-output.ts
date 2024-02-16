import { ActivityVersion, Collection, User } from ".";

export enum OutputStatus {
  Draft = "Draft",
  Completed = "Completed",
}

export class StudentOutput {
  // constructor(id: number, versionId: number) {
  //   this.user = new User("","","")
  // }
  public id?: number;
  public status?: OutputStatus;
  public user!: User;
  public version!: ActivityVersion;
}
