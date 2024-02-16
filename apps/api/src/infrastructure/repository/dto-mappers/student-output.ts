import { parseOutputStatus } from "./../../../../../../packages/common/dto/student-output";
import { OutputStatus, StudentOutput, ActivityVersion, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { studentOutput } from "@infrastructure";

export const StudentOutputDtoMapper: DomainDtoMapper<
  StudentOutput,
  typeof studentOutput
> = {
  mapFromSelectDto: (dto: typeof studentOutput.$inferSelect) => {
    const output = new StudentOutput();

    output.id = dto.id || undefined;
    output.status = parseOutputStatus(dto.status) || OutputStatus.Draft;
    const user = new User(dto.userId, "", "", "");
    user.id = dto.userId || 0;
    output.user = user;
    output.version = new ActivityVersion(dto.versionId || 0);

    return output;
  },

  mapToInsertDto: (domain: StudentOutput) => {
    const dto: typeof studentOutput.$inferInsert = {
      id: domain.id,
      status: domain.status,
      userId: domain.user.id || 0,
      versionId: domain.version.id,
    };
    return dto;
  },
};
