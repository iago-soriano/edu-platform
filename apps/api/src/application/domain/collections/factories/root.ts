import { Collection, CollectionDescription, CollectionName } from "..";
import {
  UserIsNotCollectionOwner,
  CollectionRequestDTO,
} from "@edu-platform/common";

export class CollectionFactory {
  static fromRequestDto(dto: CollectionRequestDTO, user: { id: number }) {
    const collection = new Collection(dto.id || 0);

    collection.isPrivate = dto.isPrivate || true;
    collection.notifyOwnerOnStudentOutput =
      dto.notifyOwnerOnStudentOutput || true;
    collection.name = new CollectionName(dto.name || "My collection");
    collection.description = new CollectionDescription(dto.description || null);

    collection.ownerId = user.id;

    return collection;
  }
}
