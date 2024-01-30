import { IVersions } from "@interfaces";
import {
  VersionDtoMapper,
  ContentDtoMapper,
  QuestionDtoMapper,
  AlternativeDtoMapper,
} from "../../dto-mappers";
import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
  alternatives,
} from "@infrastructure";
import { eq, inArray, and, desc, asc } from "drizzle-orm";
import { VersionStatus, ActivityVersion } from "@domain";

export class Versions implements IVersions {
  async insert(activityId: number, versionNumber: number = 0) {
    return await db.transaction(async (tx) => {
      const [{ versionId }] = await tx
        .insert(activityVersions)
        .values({ activityId, version: versionNumber })
        .returning({ versionId: activityVersions.id });
      await tx
        .update(activities)
        .set({ draftVersionId: versionId })
        .where(eq(activities.id, activityId));
      return { versionId };
    });
  }

  async update(id: number, activity: Partial<ActivityVersion>) {
    await db.transaction(async (tx) => {
      await tx
        .update(activityVersions)
        .set({
          ...activity,
          updatedAt: new Date(),
        })
        .where(eq(activityVersions.id, id));
    });
  }

  async delete(id: number) {
    await db.delete(activityVersions).where(eq(activityVersions.id, id));
  }

  async listByAuthorIdAndStatuses(authorId: number, statuses: VersionStatus[]) {
    const activityIdsByAuthor = (
      await db
        .select({ id: activities.id })
        .from(activities)
        .where(eq(activities.authorId, authorId))
    ).map(({ id }) => id);

    if (!activityIdsByAuthor.length) return [];

    const activitiesVersionsByAuthor = await db
      .select()
      .from(activityVersions)
      .orderBy(desc(activityVersions.updatedAt))
      .where(
        and(
          inArray(activityVersions.id, activityIdsByAuthor),
          inArray(
            activityVersions.status,
            statuses.length
              ? Object.keys(statuses)
              : Object.values(VersionStatus || {})
          )
        )
      );

    return activitiesVersionsByAuthor.map((dto) =>
      VersionDtoMapper.mapFromSelectDto(dto)
    );
  }

  async findSimpleViewById(id: number) {
    const version = (
      await db
        .select()
        .from(activityVersions)
        .where(eq(activityVersions.id, id))
    )[0];

    return VersionDtoMapper.mapFromSelectDto(version);
  }

  async findElementsByVersionId(id: number) {
    const contentDtos = await db
      .select()
      .from(activityContents)
      .orderBy(asc(activityContents.id))
      .where(eq(activityContents.versionId, id));

    const questionDtos = await db
      .select()
      .from(activityQuestions)
      .orderBy(asc(activityQuestions.id))
      .where(eq(activityQuestions.versionId, id))
      .orderBy(activityQuestions.id);

    const alternativesDtos = await db
      .select()
      .from(alternatives)
      .where(
        inArray(
          alternatives.questionId,
          questionDtos.map((q) => q.id)
        )
      )
      .orderBy(alternatives.questionId);

    const questions = questionDtos.map((questionDto) => {
      const question = QuestionDtoMapper.mapFromSelectDto(questionDto);
      question.alternatives = alternativesDtos
        .filter((altDto) => altDto.questionId === questionDto.id)
        .map((dto) => AlternativeDtoMapper.mapFromSelectDto(dto));
      return question;
    });
    return {
      contents: contentDtos.map((dto) =>
        ContentDtoMapper.mapFromSelectDto(dto)
      ),
      questions,
    };
  }

  async findFullViewById(id: number) {
    const version = (await this.findSimpleViewById(id)) || {};
    const { questions, contents } = await this.findElementsByVersionId(id);

    return { version, questions, contents };
  }
}
