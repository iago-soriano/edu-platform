import {
  StudentOutputRequestDTO,
  StudentOutputResponseDTO,
  VersionRequestDTO,
  parseOutputStatus,
} from "@edu-platform/common";
import { ActivityVersion, OutputStatus, StudentOutput, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { UserSelectDTO } from "@interfaces";

export const StudentOutputDtoMapper: DomainDtoMapper<
  StudentOutput,
  StudentOutputRequestDTO,
  StudentOutputResponseDTO
> = {
  mapFromDto: (
    dto: StudentOutputRequestDTO,
    userDto: UserSelectDTO,
    versionDto: VersionRequestDTO
  ) => {
    const output = new StudentOutput(dto.id || 0);

    output.status = parseOutputStatus(dto.status) || OutputStatus.Draft;

    const user = new User(
      userDto.id,
      userDto.name || "",
      userDto.email || "",
      ""
    );

    const version = new ActivityVersion();
    version.id = versionDto.id || 0;

    output.user = user;
    output.version = version;

    return output;
  },

  mapToDto: (domain: StudentOutput) => {
    const dto: StudentOutputResponseDTO = {
      id: domain.id || 0,
      status: domain.status || OutputStatus.Draft,
      userId: domain.user?.id || 0,
      versionId: domain.version.id!,
    };
    return dto;
  },
};
