import { collections, collectionParticipations } from "@infrastructure";
import { CollectionParticipation, ParticipationType } from "@domain";
import { ChangeEventsTree } from "@interfaces";

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

  static deserialize(
    dto: typeof collectionParticipations.$inferSelect,
    _events: ChangeEventsTree
  ) {
    const domain = new CollectionParticipation();

    domain.id = dto.id;
    domain.collectionId = dto.collectionId;
    domain.userId = dto.userId;
    domain.type = dto.type as unknown as ParticipationType;

    domain.isNew = false;

    _events[dto.id].CollectionParticipation = {
      ..._events[dto.id].CollectionParticipation,
      [dto.id]: {},
    };

    const proxiedEntity = new Proxy(domain, {
      set: function (target: object, prop: string, value: any) {
        _events[prop] = value;
        Reflect.set(target, prop, value);
        return true;
      },
    }) as CollectionParticipation;

    return proxiedEntity;
  }
}
