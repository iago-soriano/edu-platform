import { parseOutputStatus } from "./../../../../../../packages/common/dto/student-output";
import { OutputStatus, StudentOutput, ActivityVersion, User } from "@domain";
import { DomainDtoMapper } from "./types";
import { VersionDtoMapper } from ".";
import { studentOutputs, users, activityVersions } from "@infrastructure";

export const StudentOutputDtoMapper: DomainDtoMapper<
  StudentOutput,
  typeof studentOutputs
> = {
  mapFromSelectDto: (
    dto: typeof studentOutputs.$inferSelect,
    versionDto?: typeof activityVersions.$inferSelect,
    userDto?: typeof users.$inferSelect
  ) => {
    const output = new StudentOutput(dto.id);

    output.status = parseOutputStatus(dto.status);
    const user = new User(
      dto.userId,
      userDto?.name || "",
      userDto?.email || "",
      ""
    );
    user.id = dto.userId || 0;
    output.user = user;
    output.version = versionDto
      ? VersionDtoMapper.mapFromSelectDto({
          ...versionDto,
        })
      : new ActivityVersion(dto.versionId || 0);

    return output;
  },

  mapToInsertDto: (domain: StudentOutput) => {
    const dto: typeof studentOutputs.$inferInsert = {
      status: domain.status,
      userId: domain.user.id,
      versionId: domain.version.id!,
      updatedAt: new Date(),
    };
    return dto;
  },
};
