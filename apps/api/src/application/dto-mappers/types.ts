export interface DomainDtoMapper<Domain, Dto> {
  mapFromDto(dto: Dto, ...other: any): Domain;
  mapToDto(dto: Domain): Dto;
}
