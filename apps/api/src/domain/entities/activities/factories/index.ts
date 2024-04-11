import { ContentFactory } from "./content";
import { QuestionFactory, QuestionAlternativeFactory } from "./question";
import { VersionFactory } from "./version";
import { GetUUID } from "@infrastructure/utils";
import { Collection, Activity } from "@domain/entities";

export { ContentFactory, QuestionFactory, QuestionAlternativeFactory };

export class ActivitiesFactory {
  public static Versions: VersionFactory = new VersionFactory();
  public static Contents: ContentFactory = new ContentFactory();

  public static from(collection: Collection, user: { id: number }) {
    if (collection.ownerId !== user.id)
      throw new Error("You cannot add activities to this collection");

    const activity = new Activity();

    activity.id = GetUUID();
    activity.collectionId = collection.id as number;
    activity.authorId = user.id;

    activity.setDraftVersion(ActivitiesFactory.Versions.emptyDraftFrom());

    return activity;
  }
}
