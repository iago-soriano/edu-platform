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
  activityId: string;
}> {
  constructor(payload: { activityId: string }) {
    super("ActivityPublished", payload);
  }
}

export class StudentOutputCreatedEvent extends DomainEvent<{
  studentOutputId: number;
  studentId: string;
  activityAuthorId: string;
  activityTitle: string;
}> {
  constructor(payload: {
    studentOutputId: number;
    studentId: string;
    activityAuthorId: string;
    activityTitle: string;
  }) {
    super("StudentOutputCreated", payload);
  }
}

export class StudentOutputPublishedEvent extends DomainEvent<{
  studentOutputId: number;
  studentId: string;
  activityAuthorId: string;
  activityTitle: string;
}> {
  constructor(payload: {
    studentOutputId: number;
    studentId: string;
    activityAuthorId: string;
    activityTitle: string;
  }) {
    super("StudentOutputPublished", payload);
  }
}

export class FeedbackToAnswerPublishedEvent extends DomainEvent<{
  studentOutputId: number;
  studentId: string;
  activityAuthorId: string;
  activityTitle: string;
}> {
  constructor(payload: {
    studentOutputId: number;
    studentId: string;
    activityAuthorId: string;
    activityTitle: string;
  }) {
    super("FeedbackToAnswerPublished", payload);
  }
}
