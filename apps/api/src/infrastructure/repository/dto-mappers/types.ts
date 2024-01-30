import {
  relations,
  type InferSelectModel,
  type InferInsertModel,
  type Table,
} from "drizzle-orm";

export interface DomainDtoMapper<Domain, T extends Table> {
  mapFromSelectDto(dto: InferSelectModel<T>): Domain;
  maptoInsertDto(domain: Partial<Domain>): InferInsertModel<T>;
}
