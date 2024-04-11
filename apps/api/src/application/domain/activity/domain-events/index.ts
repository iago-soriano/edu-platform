import { DomainEvent } from "../../abstract";
import { Activity } from "../root";

export class ActivityPublishedEvent extends DomainEvent {
  constructor(payload: { activity: Activity }) {
    super("ActivityPublished", payload);
  }
}
