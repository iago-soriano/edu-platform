export interface DomainDtoMapper<Domain, ReqDto, RespDto> {
  mapFromDto(dto: ReqDto, ...other: any): Domain;
  mapToDto(dto: Domain): RespDto;
}
