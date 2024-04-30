import { DomainEvent } from "@edu-platform/common/platform";

export class UserCreatedEvent extends DomainEvent<{
  id: string;
  email: string;
  name: string;
}> {
  constructor({
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }) {
    super("UserCreated", { id, email, name });
  }
}

export class ActivityPublishedEvent extends DomainEvent<{
  activityId: number | string;
}> {
  constructor(payload: { activityId: number | string }) {
    super("ActivityPublished", payload);
  }
}
