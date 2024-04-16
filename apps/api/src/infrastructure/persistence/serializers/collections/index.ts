import { collections, collectionParticipations } from "../../schema";
import {
  Collection,
  CollectionParticipation,
  CollectionDescription,
  CollectionName,
} from "@domain/entities";
import {
  ChangeEventsTree,
  CollectionArray,
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
    collectionDto: typeof collections.$inferSelect,
    _events: ChangeEventsTree,
    participationDtos:
      | (typeof collectionParticipations.$inferSelect | null)[]
      | null
  ) {
    const collection = new Collection(collectionDto.id || 0);

    collection.isPrivate = collectionDto.isPrivate;
    collection.notifyOwnerOnStudentOutput =
      collectionDto.notifyOwnerOnStudentOutput;
    collection.name = new CollectionName(collectionDto.name);
    collection.description = new CollectionDescription(
      collectionDto.description
    );

    collection.participants = new CollectionArray<CollectionParticipation>();

    if (participationDtos) {
      for (const part of participationDtos) {
        if (part)
          collection.participants.push(
            CollectionParticipationSerializer.deserialize(part, _events)
          );
      }
    }

    collection.isNew = false;

    _events[collectionDto.id].Collection = {
      ..._events[collectionDto.id].Collection,
      [collectionDto.id]: {},
    };

    const proxiedEntity = new Proxy(collection, {
      set: function (target: object, prop: string, value: any) {
        _events[prop] = value;
        Reflect.set(target, prop, value);
        return true;
      },
    }) as Collection;

    return proxiedEntity;
  }
}
