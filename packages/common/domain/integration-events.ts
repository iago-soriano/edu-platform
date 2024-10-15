import { DomainEvent } from "../platform";

export class GenerateActivityGPTEvent extends DomainEvent<{
  activityId: string;
}> {
  constructor(activityId: string) {
    super("ActivityCreated", { activityId });
  }
}
