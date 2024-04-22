import { ICollectionsRepository } from "@application/interfaces";
import {
  db,
  collections,
  collectionParticipations,
  activities,
} from "../schema";
import { eq, and, sql } from "drizzle-orm";
import { BaseRepository } from "@edu-platform/common/platform";
import { CollectionSerializer } from "../serializers";
import { AllTables } from "./all-tables";
import { ParticipationType } from "domain/enums";

export const CollectionEntityNames = {
  Collection: AllTables["Collection"],
  CollectionParticipation: AllTables["CollectionParticipation"],
};

export class CollectionsRepository
  extends BaseRepository<typeof CollectionEntityNames>
  implements ICollectionsRepository
{
  constructor() {
    super(CollectionEntityNames, db);
  }

  async findById(collectionId: number) {
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];
    if (!dto) return null;
    return CollectionSerializer.deserialize(dto, null);
  }

  async findByIdWithParticipants(collectionId: number) {
    const dto = await db
      .select()
      .from(collections)
      .leftJoin(
        collectionParticipations,
        and(
          eq(collectionParticipations.id, collections.id),
          eq(collectionParticipations.type, ParticipationType.Student)
        )
      )
      .where(eq(collections.id, collectionId));
    if (!dto) return null;

    return CollectionSerializer.deserialize(
      dto[0].collections,
      dto.map(({ collection_participations }) => collection_participations)
    );
  }

  async findByIdWithActivityCount(collectionId: number) {
    const dto = (
      await db
        .select({
          id: collections.id,
          ownerId: collections.ownerId,
          activitiesCount: sql<number>`COUNT(${activities.id}) OVER ()`.as(
            "activitiesCount"
          ),
        })
        .from(collections)
        .leftJoin(activities, eq(activities.collectionId, collections.id))
        .where(eq(collections.id, collectionId))
    )[0];

    if (!dto) return null;
    return {
      collection: CollectionSerializer.deserialize(dto, null),
      activitiesCount: dto.activitiesCount,
    };
  }

  async findByIdWithAParticipation(
    collectionId: number,
    participationId: number
  ) {
    const dto = await db
      .select()
      .from(collections)
      .leftJoin(
        collectionParticipations,
        eq(collectionParticipations.collectionId, collections.id)
      )
      .where(
        and(
          eq(collections.id, collectionId),
          eq(collectionParticipations.id, participationId)
        )
      );
    if (!dto) return null;

    return CollectionSerializer.deserialize(
      dto[0].collections,
      dto.map(({ collection_participations }) => collection_participations)
    );
  }
}
