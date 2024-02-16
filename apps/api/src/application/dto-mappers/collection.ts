import { CollectionDTO } from "@edu-platform/common";
import { Collection, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { UserSelectDTO } from "@interfaces";

export const CollectionDtoMapper: DomainDtoMapper<Collection, CollectionDTO> = {
  mapFromDto: (dto: CollectionDTO, user: UserSelectDTO) => {
    const collection = new Collection();

    collection.id = dto.id || undefined;
    collection.name = dto.name || "";
    collection.isPrivate = dto.isPrivate || true;
    collection.notifyOwnerOnStudentOutput =
      dto.notifyOwnerOnStudentOutput || true;

    const owner = new User("", "", "");
    owner.id = user.id;
    collection.owner = owner;

    return collection;
  },

  mapToDto: (domain: Collection) => {
    const dto: CollectionDTO = {
      id: domain.id,
      name: domain.name,
      ownerId: domain.owner.id,
      isPrivate: domain.isPrivate,
      notifyOwnerOnStudentOutput: domain.notifyOwnerOnStudentOutput,
    };
    return dto;
  },
};
