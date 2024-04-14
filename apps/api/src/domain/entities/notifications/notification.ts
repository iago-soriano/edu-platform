import { Entity } from "@domain/abstract";
import { NotificationType } from "./enums";

export { NotificationType } from "./enums";

export class Notification extends Entity {
  public userId!: number;
  public isUnread!: boolean;
  public type!: NotificationType;
  public message!: string;
  public details!: string;

  public setAsViewed() {
    this.isUnread = false;
  }
}
