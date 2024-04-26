import { Collection, CollectionDescription, CollectionName } from "..";

export class CollectionFactory {
  static default(user: { id: number }) {
    const collection = new Collection();

    collection.isPrivate = true;
    collection.notifyOwnerOnStudentOutput = true;
    collection.name = new CollectionName("My collection");
    collection.description = new CollectionDescription(null);

    collection.ownerId = user.id;

    return collection;
  }
}
