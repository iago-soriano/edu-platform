import { DomainEvent } from "@edu-platform/common/platform";
import { Activity } from "@domain/entities";

export class ActivityPublishedEvent extends DomainEvent {
  constructor(payload: { activity: Activity }) {
    super("ActivityPublished", payload);
  }
}
