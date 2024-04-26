import { collections, collectionParticipations } from "../../schema";
import {
  Collection,
  CollectionParticipation,
  CollectionDescription,
  CollectionName,
} from "@core/domain/entities";
import {
  ChangeEventsTree,
  CollectionArray,
  ChangeTrackingProxy,
} from "@edu-platform/common/platform";

import { CollectionParticipationSerializer } from "./participations";

export { CollectionParticipationSerializer };

export class CollectionSerializer {
  static serialize(domain: Collection) {
    const dto: typeof collections.$inferInsert = {
      name: domain.name.toString(),
      description: domain.description.toString(),
      ownerId: domain.ownerId,
      isPrivate: domain.isPrivate,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  }

  static deserialize(
    dto: Partial<typeof collections.$inferSelect>,
    participationDtos:
      | (typeof collectionParticipations.$inferSelect | null)[]
      | null
  ) {
    const collection = new Collection(
      dto.id || 0,
      dto.name,
      dto.description,
      dto.isPrivate,
      dto.notifyOwnerOnStudentOutput,
      dto.ownerId
    );

    collection.participants = new CollectionArray<CollectionParticipation>();

    if (participationDtos) {
      for (const part of participationDtos) {
        if (part)
          collection.participants.push(
            CollectionParticipationSerializer.deserialize(part)
          );
      }
    }

    collection.isNew = false;

    return new ChangeTrackingProxy(collection) as Collection;
  }
}
