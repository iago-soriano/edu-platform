import { Collection } from "@domain";
import { DomainDtoMapper } from "./types";
import { collections } from "../schema";

export const CollectionDtoMapper: DomainDtoMapper<
  Collection,
  typeof collections
> = {
  mapFromSelectDto: (dto: typeof collections.$inferSelect) => {
    const collection = new Collection();

    collection.id = dto.id || 0;
    collection.ownerId = dto.ownerId || 0;

    return collection;
  },

  maptoInsertDto: (domain: Collection) => {
    return domain;
  },
};
