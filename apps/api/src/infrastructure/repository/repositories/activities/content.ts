import { IContents } from "@interfaces";
import { Content } from "@domain";
import { db, activityVersions, activityContents } from "@infrastructure";
import { eq } from "drizzle-orm";
import { ContentDtoMapper } from "../../dto-mappers";

export class Contents implements IContents {
  async insert(content: Content) {
    if (!content.version.id)
      throw new Error("There must be a version id to insert");

    return db.transaction(async (tx) => {
      const insertedContent = (
        await tx
          .insert(activityContents)
          .values(ContentDtoMapper.mapToInsertDto(content))
          .returning({ contentId: activityContents.id })
      )[0];

      await tx
        .update(activityVersions)
        .set({ updatedAt: new Date() })
        .where(eq(activityVersions.id, content.version.id!));

      return insertedContent;
    });
  }

  async update(content: Content) {
    if (!content.id || !content.version.id)
      throw new Error("There must be an id to update");

    await db.transaction(async (tx) => {
      await tx
        .update(activityContents)
        .set(ContentDtoMapper.mapToInsertDto(content))
        .where(eq(activityContents.id, content.id!));

      await tx
        .update(activityVersions)
        .set({ updatedAt: new Date() })
        .where(eq(activityVersions.id, content.version.id!));
    });
  }

  async findById(contentId: number) {
    const dto = (
      await db
        .select()
        .from(activityContents)
        .where(eq(activityContents.id, contentId))
    )[0];
    return ContentDtoMapper.mapFromSelectDto(dto);
  }

  async delete(contentId: number) {
    await db.delete(activityContents).where(eq(activityContents.id, contentId));
  }

  async listByVersionId(versionId: number) {
    const contents = await db
      .select()
      .from(activityContents)
      .where(eq(activityVersions.id, versionId));

    return contents.map((dto) => ContentDtoMapper.mapFromSelectDto(dto));
  }
}

// export class ContentsRead implements IContentsRead {
//   async listByVersionId(versionId: number) {
//     const contents = await db
//       .select()
//       .from(activityContents)
//       .where(eq(activityVersions.id, versionId));

//     return contents.map((dto) => ContentDtoMapper.mapFromSelectDto(dto));
//   }
// }
