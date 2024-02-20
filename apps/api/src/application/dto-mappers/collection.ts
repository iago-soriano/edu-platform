import {
  CollectionRequestDTO,
  CollectionResponseDTO,
} from "@edu-platform/common";
import { Collection, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { UserSelectDTO } from "@interfaces";

export const CollectionDtoMapper: DomainDtoMapper<
  Collection,
  CollectionRequestDTO,
  CollectionResponseDTO
> = {
  mapFromDto: (dto: CollectionRequestDTO, user: UserSelectDTO) => {
    const collection = new Collection();

    collection.id = dto.id;
    collection.name = dto.name;
    collection.description = dto.description;
    collection.isPrivate = dto.isPrivate;
    collection.notifyOwnerOnStudentOutput = dto.notifyOwnerOnStudentOutput;

    const owner = new User(user.id, "", "", "");
    collection.owner = owner;

    return collection;
  },

  mapToDto: (domain: Collection) => {
    const dto: CollectionResponseDTO = {
      id: domain.id || 0,
      createdAt: domain.createdAt || new Date(),
      updatedAt: domain.updatedAt || new Date(),

      name: domain.name || "",
      description: domain.description || "",
      ownerId: domain.owner.id || 0,
      isPrivate: domain.isPrivate || false,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput || false,
    };
    return dto;
  },
};
