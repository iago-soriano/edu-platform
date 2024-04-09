import {
  ICollectionsRepository,
  ICollectionsReadRepository,
} from "@interfaces";
import { db, collections, collectionParticipations } from "@infrastructure";
import { eq, sql, desc, and } from "drizzle-orm";
import { BaseRepository, AllTablesIndexer } from "./base-repository";
import { CollectionSerializer } from "../serializers";

export const CollectionEntityNames: AllTablesIndexer[] = [
  "Collection",
  "CollectionParticipation",
];

export class CollectionsRepository
  extends BaseRepository
  implements ICollectionsRepository
{
  constructor() {
    super(CollectionEntityNames);
  }

  async findRootById(collectionId: number) {
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;

    super.initializeEventTracking(collectionId, this._events);

    return CollectionSerializer.deserialize(dto, this._events, null);
  }

  async findRootByIdWithParticipants(collectionId: number) {
    const dto = await db
      .select()
      .from(collections)
      .leftJoin(
        collectionParticipations,
        eq(collectionParticipations.id, collections.id)
      )
      .where(eq(collections.id, collectionId));
    if (!dto) return null;

    super.initializeEventTracking(collectionId, this._events);

    return CollectionSerializer.deserialize(
      dto[0].collections,
      this._events,
      dto.map(({ collection_participations }) => collection_participations)
    );
  }

  async findRootByIdWithActivityCount(collectionId: number) {
    //TODO
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;

    super.initializeEventTracking(collectionId, this._events);

    return CollectionSerializer.deserialize(dto, this._events, null);
  }
}
