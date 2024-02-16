import {
  StudentOutputDTO,
  VersionDTO,
  parseOutputStatus,
} from "@edu-platform/common";
import { ActivityVersion, OutputStatus, StudentOutput, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { UserSelectDTO } from "@interfaces";

export const StudentOutputDtoMapper: DomainDtoMapper<
  StudentOutput,
  StudentOutputDTO
> = {
  mapFromDto: (
    dto: StudentOutputDTO,
    userDto: UserSelectDTO,
    versionDto: VersionDTO
  ) => {
    const output = new StudentOutput();

    output.id = dto.id || undefined;
    output.status = parseOutputStatus(dto.status) || OutputStatus.Draft;

    const user = new User(userDto.name || "", userDto.email || "", "");
    user.id = userDto.id;

    const version = new ActivityVersion();
    version.id = versionDto.id || 0;

    output.user = user;
    output.version = version;

    return output;
  },

  mapToDto: (domain: StudentOutput) => {
    const dto: StudentOutputDTO = {
      id: domain.id,
      status: domain.status,
      userId: domain.user.id,
      versionId: domain.version.id,
    };
    return dto;
  },
};
