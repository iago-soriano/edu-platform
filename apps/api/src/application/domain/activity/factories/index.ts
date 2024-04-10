import { ContentFactory } from "./content";
import { QuestionFactory, QuestionAlternativeFactory } from "./question";
import { VersionFactory } from "./version";
import { IIdGenerator } from "@interfaces";
import { Collection, Activity } from "@domain";

export { ContentFactory, QuestionFactory, QuestionAlternativeFactory };

export interface IActivitiesFactory {
  Versions: VersionFactory;
  Contents: ContentFactory;
  from: (collection: Collection, user: { id: number }) => Activity;
}

export class ActivitiesFactory {
  public Versions: VersionFactory;
  public Contents: ContentFactory;

  constructor(private idService: IIdGenerator) {
    this.Versions = new VersionFactory(this.idService);
    this.Contents = new ContentFactory();
  }

  public from(collection: Collection, user: { id: number }) {
    if (collection.ownerId !== user.id)
      throw new Error("You cannot add activities to this collection");

    const activity = new Activity();

    activity.id = this.idService.getId();
    activity.collectionId = collection.id as number;
    activity.authorId = user.id;

    activity.setDraftVersion(this.Versions.emptyDraftFrom());
  }
}
