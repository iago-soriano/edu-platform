import { DomainEvent } from "../platform";

export class GenerateActivityGPTEvent extends DomainEvent<{
  activityId: string;
}> {
  constructor({ payload }: GenerateActivityGPTEvent) {
    super("ActivityCreated", payload);
  }
}
