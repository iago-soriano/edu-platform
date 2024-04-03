// import { IElements } from "@interfaces";
// import { BaseElement } from "@domain";
// import { db, activityVersions, activityContents } from "@infrastructure";
// import { eq } from "drizzle-orm";

// export class Elements implements IElements {
//   async insert(tx: typeof db, element: BaseElement) {
//     if (!element.versionId)
//       throw new Error("There must be a version id to insert");

//     if (element.elementType === "Content") {
//       await tx
//         .insert(activityContents)
//         .values(ContentDtoMapper.mapToInsertDto(element))
//         .returning({ contentId: activityContents.id });
//     } else {
//       // await tx
//       // .insert(activityContents)
//       // .values(ContentDtoMapper.mapToInsertDto(element))
//       // .returning({ contentId: activityContents.id });
//     }

//     await tx
//       .update(activityVersions)
//       .set({ updatedAt: new Date() })
//       .where(eq(activityVersions.id, element.versionId!));
//   }

//   async update(tx: typeof db, element: BaseElement) {
//     if (!element.id || !element.versionId)
//       throw new Error("There must be an id to update");

//     if (element.elementType === "Content") {
//       await tx
//         .update(activityContents)
//         .set(ContentDtoMapper.mapToInsertDto(element))
//         .where(eq(activityContents.id, element.id!));
//     } else {
//     }
//     await tx
//       .update(activityVersions)
//       .set({ updatedAt: new Date() })
//       .where(eq(activityVersions.id, element.versionId!));
//   }

//   async delete(tx: typeof db, element: BaseElement) {
//     if (!element.id) throw new Error("There must be an id to delete");

//     if (element.elementType === "Content") {
//       await tx
//         .delete(activityContents)
//         .where(eq(activityContents.id, element.id));
//     } else {
//     }
//   }
// }
