import { ContentFactory } from "./content";
import { QuestionFactory, QuestionAlternativeFactory } from "./question";
import { VersionFactory } from "./version";
import { GetUUID } from "@edu-platform/common/platform";
import { Collection, Activity } from "@domain/entities";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common";

export { ContentFactory, QuestionFactory, QuestionAlternativeFactory };

export class ActivitiesFactory {
  public static Versions: VersionFactory = new VersionFactory();
  public static Contents: ContentFactory = new ContentFactory();

  public static from(
    collection: Partial<Collection>,
    activitiesCount: number,
    user: { id: number }
  ) {
    if (collection.ownerId !== user.id)
      throw new SilentInvalidStateError(
        "You cannot add activities to this collection"
      );

    if (activitiesCount > 10)
      throw new InvalidStateError(
        "There can only be up to 10 activities per collection"
      );
    const activity = new Activity();

    activity.id = GetUUID();
    activity.collectionId = collection.id as number;
    activity.authorId = user.id;

    activity.setDraftVersion(ActivitiesFactory.Versions.emptyDraftFrom());

    return activity;
  }
}
