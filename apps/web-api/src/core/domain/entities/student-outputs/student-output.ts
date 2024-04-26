import { ActivityVersion, Collection, User } from "..";
import { OutputStatus } from "./enums";

export { OutputStatus } from "./enums";

export class StudentOutput {
  constructor(id: number) {
    this.id = id;
  }
  public id?: number;
  public status!: OutputStatus;
  public user!: User;
  public version!: ActivityVersion;
}
