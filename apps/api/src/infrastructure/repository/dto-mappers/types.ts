import {
  relations,
  type InferSelectModel,
  type InferInsertModel,
  type Table,
} from "drizzle-orm";

export interface DomainDtoMapper<Domain, T extends Table> {
  mapFromSelectDto(dto: Partial<InferSelectModel<T>>): Domain;
  mapToInsertDto(domain: Partial<Domain>): InferInsertModel<T>;
}
