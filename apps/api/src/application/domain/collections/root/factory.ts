import { collections } from "@infrastructure";
import { IChangeEvent } from "@interfaces";
import { Collection } from "./root";
import {
  UserIsNotCollectionOwner,
  CollectionRequestDTO,
} from "@edu-platform/common";
export class CollectionFactory {
  static fromDbDTOWithProxy(
    dto: typeof collections.$inferInsert,
    _events: { [prop: string]: string | number }
  ) {
    const collection = new Collection(dto.id || 0);

    collection.isPrivate = dto.isPrivate;
    collection.notifyOwnerOnStudentOutput = dto.notifyOwnerOnStudentOutput;
    collection.name = dto.name;
    collection.description = dto.description;

    const proxiedEntity = new Proxy(collection, {
      set: function (target: object, prop: string, value: any) {
        _events[prop] = value;
        Reflect.set(target, prop, value);
        return true;
      },
    }) as Collection;

    return proxiedEntity;
  }

  static fromRequestDto(dto: CollectionRequestDTO, user: { id: number }) {
    const collection = new Collection(dto.id || 0);

    collection.isPrivate = dto.isPrivate;
    collection.notifyOwnerOnStudentOutput = dto.notifyOwnerOnStudentOutput;
    collection.name = dto.name;
    collection.description = dto.description;
    collection.ownerId = user.id;

    return collection;
  }
}
