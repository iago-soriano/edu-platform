import { NotificationType } from "./enums";
import { Entity } from "@edu-platform/common/platform";

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
