import {
  ICollectionsRepository,
  ICollectionsReadRepository,
} from "@application/interfaces";
import { db, collections, collectionParticipations } from "../schema";
import { eq, sql, desc, and } from "drizzle-orm";
import { BaseRepository } from "./base-repository";
import { CollectionSerializer } from "../serializers";
import { AllTables } from "./all-tables";

export const CollectionEntityNames = {
  Collection: AllTables["Collection"],
  CollectionParticipation: AllTables["CollectionParticipation"],
};

export class CollectionsRepository
  extends BaseRepository<typeof CollectionEntityNames>
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
