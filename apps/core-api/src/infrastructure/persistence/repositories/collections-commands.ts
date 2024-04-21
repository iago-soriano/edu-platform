import { ICollectionsRepository } from "@application/interfaces";
import { db, collections, collectionParticipations } from "../schema";
import { eq, and } from "drizzle-orm";
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

  async findRootById(collectionId: number) {
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];
    if (!dto) return null;
    return CollectionSerializer.deserialize(dto, null);
  }

  async findRootByIdWithParticipants(collectionId: number) {
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

  async findRootByIdWithActivityCount(collectionId: number) {
    //TODO
    const dto = (
      await db
        .select()
        .from(collections)
        .where(eq(collections.id, collectionId))
    )[0];
    if (!dto) return null;
    return CollectionSerializer.deserialize(dto, null);
  }
}
