import { collections, collectionParticipations } from "../../schema";
import {
  CollectionParticipation,
  ParticipationType,
} from "@core/domain/entities";
import { ChangeTrackingProxy } from "@edu-platform/common/platform";

export class CollectionParticipationSerializer {
  static serialize(domain: CollectionParticipation) {
    const dto: typeof collectionParticipations.$inferInsert = {
      collectionId: domain.collectionId,
      userId: domain.userId,
      notifyOnActivityInsert: domain.notifyOnActivityInsert,
      type: domain.type.toString(),
    };
    return dto;
  }

  static deserialize(dto: typeof collectionParticipations.$inferSelect) {
    const domain = new CollectionParticipation(
      dto.userId,
      dto.collectionId,
      dto.type as unknown as ParticipationType,
      dto.notifyOnActivityInsert
    );

    domain.isNew = false;

    return new ChangeTrackingProxy(domain) as CollectionParticipation;
  }
}
