import { Collection } from "@domain";
import { DomainDtoMapper } from "./types";
import { collections } from "@infrastructure";

export const CollectionDtoMapper: DomainDtoMapper<
  Collection,
  typeof collections
> = {
  mapFromSelectDto: (dto: typeof collections.$inferSelect) => {
    const collection = new Collection();

    collection.id = dto.id || undefined;
    collection.name = dto.name || "";
    collection.createdAt = dto.createdAt || undefined;
    collection.updatedAt = dto.updatedAt || undefined;
    collection.ownerId = dto.ownerId || undefined;
    collection.isPrivate = dto.isPrivate || true;
    collection.notifyOwnerOnStudentOutput =
      dto.notifyOwnerOnStudentOutput || true;

    return collection;
  },

  mapToInsertDto: (domain: Collection) => {
    const dto: typeof collections.$inferInsert = {
      id: domain.id,
      name: domain.name,
      ownerId: domain.ownerId,
      isPrivate: domain.isPrivate,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  },
};
