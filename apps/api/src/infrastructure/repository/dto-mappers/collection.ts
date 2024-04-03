import { Collection, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { collections } from "@infrastructure";

export const CollectionDtoMapper = {
  mapFromSelectDto: (dto: typeof collections.$inferSelect) => {
    const collection = new Collection(dto.id);

    collection.name = dto.name || "";
    collection.description = dto.description || "";
    collection.createdAt = dto.createdAt || undefined;
    collection.updatedAt = dto.updatedAt || undefined;
    collection.ownerId = dto.ownerId;
    collection.isPrivate = dto.isPrivate === null ? false : dto.isPrivate;
    collection.notifyOwnerOnStudentOutput =
      dto.notifyOwnerOnStudentOutput === null
        ? false
        : dto.notifyOwnerOnStudentOutput;

    return collection;
  },

  mapToInsertDto: (domain: Collection) => {
    const dto: typeof collections.$inferInsert = {
      name: domain.name,
      description: domain.description,
      ownerId: domain.ownerId,
      isPrivate: domain.isPrivate,
      updatedAt: new Date(),
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  },
};
