import { DomainEvent } from "@edu-platform/common/platform";

export class GenerateActivityGPTEvent extends DomainEvent<{
  activityId: string;
}> {
  constructor(payload: { activityId: string }) {
    super("ActivityCreated", payload);
  }
}
