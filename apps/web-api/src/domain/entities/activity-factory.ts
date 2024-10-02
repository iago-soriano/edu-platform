import { GetUUID } from '@edu-platform/common/platform';
import { Activity } from './activity';
import { InvalidStateError } from '@edu-platform/common';

export class ActivitiesFactory {
  public static from(activitiesCount: number, user: { id: string }) {
    if (activitiesCount > 10)
      throw new InvalidStateError(
        'There can only be up to 10 activities per collection',
      );
    const activity = new Activity();

    activity.id = GetUUID();

    return activity;
  }
}
