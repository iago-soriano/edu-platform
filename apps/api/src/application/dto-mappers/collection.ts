import { CollectionDTO } from "@edu-platform/common";
import { Collection } from "@domain";
import { DomainDtoMapper } from "./types";

export const CollectionDtoMapper: DomainDtoMapper<Collection, CollectionDTO> = {
  mapFromDto: (dto: CollectionDTO) => {
    const collection = new Collection();

    collection.id = dto.id || undefined;
    collection.name = dto.name || "";
    collection.ownerId = dto.ownerId || undefined;
    collection.isPrivate = dto.isPrivate || true;
    collection.notifyOwnerOnStudentOutput =
      dto.notifyOwnerOnStudentOutput || true;

    return collection;
  },

  mapToDto: (domain: Collection) => {
    const dto: CollectionDTO = {
      id: domain.id,
      name: domain.name,
      ownerId: domain.ownerId,
      isPrivate: domain.isPrivate,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  },
};
