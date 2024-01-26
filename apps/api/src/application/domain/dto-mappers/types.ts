export interface DomainDtoMapper<Domain, Dto> {
  mapFromDto(dto: Dto): Domain;
  mapToDto(dto: Domain): Dto;
}
