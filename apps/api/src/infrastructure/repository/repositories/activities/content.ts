import { IContents } from "@interfaces";
import { Content } from "@domain";
import { db, activityVersions, activityContents } from "@infrastructure";
import { eq } from "drizzle-orm";
import { ContentDtoMapper } from "../../dto-mappers";

export class Contents implements IContents {
  async insert(content: Content) {
    const dto = ContentDtoMapper.maptoInsertDto(content);

    return (
      await db
        .insert(activityContents)
        .values(dto)
        .returning({ contentId: activityContents.id })
    )[0];
  }
  async update(contentId: number, content: Content, versionId: number) {
    const dto = ContentDtoMapper.maptoInsertDto(content);
    await db
      .update(activityContents)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(activityContents.id, contentId));

    await db
      .update(activityVersions)
      .set({ updatedAt: new Date() })
      .where(eq(activityVersions.id, versionId));
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
}
