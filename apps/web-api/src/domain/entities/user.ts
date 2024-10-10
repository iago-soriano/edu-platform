import { Entity } from "@edu-platform/common/platform";

export class User extends Entity {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public counter: number,
    public subscriptionEndsAt: Date
  ) {
    super();
  }

  private isPremium() {
    return this.subscriptionEndsAt.getTime() > Date.now();
  }

  public canUserCreateActivities() {
    return this.isPremium() || (!this.isPremium() && this.counter > 0);
  }

  public decrementCounter() {
    this.counter--;
  }
}
