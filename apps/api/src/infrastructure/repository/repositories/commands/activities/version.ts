// import { IVersions, IActivitiesReadRepository } from "@interfaces";
// import { VersionDtoMapper } from "../../../dto-mappers";
// import { db, activityVersions } from "@infrastructure";
// import { eq, sql, and, desc } from "drizzle-orm";
// import { VersionStatus, ActivityVersion } from "@domain";

// export class Versions implements IVersions {
//   async insert(tx: typeof db, version: ActivityVersion) {
//     return (
//       await tx
//         .insert(activityVersions)
//         .values(VersionDtoMapper.mapToInsertDto(version))
//         .returning({ versionId: activityVersions.id })
//     )[0];
//   }

//   async update(tx: typeof db, version: ActivityVersion) {
//     if (!version.id) throw new Error("There must be an id to update");

//     await tx
//       .update(activityVersions)
//       .set(VersionDtoMapper.mapToInsertDto(version))
//       .where(eq(activityVersions.id, version.id));
//   }

//   async delete(tx: typeof db, id: string) {
//     await tx.delete(activityVersions).where(eq(activityVersions.id, id));
//   }
// }
