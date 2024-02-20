import { Collection, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { collections } from "@infrastructure";

export const CollectionDtoMapper: DomainDtoMapper<
  Collection,
  typeof collections
> = {
  mapFromSelectDto: (dto: typeof collections.$inferSelect) => {
    const collection = new Collection();
    // if (!dto) return null;

    collection.id = dto.id;
    collection.name = dto.name || "";
    collection.description = dto.description || "";
    collection.createdAt = dto.createdAt || undefined;
    collection.updatedAt = dto.updatedAt || undefined;
    collection.owner = new User(dto.ownerId || 0);
    collection.isPrivate = dto.isPrivate === null ? false : dto.isPrivate;
    collection.notifyOwnerOnStudentOutput =
      dto.notifyOwnerOnStudentOutput === null
        ? false
        : dto.notifyOwnerOnStudentOutput;

    return collection;
  },

  mapToInsertDto: (domain: Collection) => {
    const dto: typeof collections.$inferInsert = {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      ownerId: domain.owner.id,
      isPrivate: domain.isPrivate,
      updatedAt: new Date(),
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  },
};
