import { IVersions } from "@interfaces";
import {
  VersionDtoMapper,
  ContentDtoMapper,
  QuestionDtoMapper,
  AlternativeDtoMapper,
  ActivityDtoMapper,
  CollectionDtoMapper,
} from "../../dto-mappers";
import {
  db,
  activities,
  activityVersions,
  activityContents,
  activityQuestions,
  alternatives,
  collections,
  studentCollectionParticipation,
} from "@infrastructure";
import { eq, inArray, and, desc, asc, sql } from "drizzle-orm";
import { VersionStatus, ActivityVersion, Question } from "@domain";

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

  async listByCollectionOwnership(userId: number, collectionId?: number) {
    const res = await db
      .select()
      .from(activityVersions)
      .innerJoin(activities, eq(activities.id, activityVersions.activityId))
      .innerJoin(collections, eq(collections.id, activities.collectionId)) // activity belonging to a collection
      .where(
        collectionId
          ? and(
              eq(collections.ownerId, userId), // user owns collection
              eq(collections.id, collectionId)
            )
          : eq(collections.ownerId, userId)
      );

    return res.map(({ activity_version, collections }) => ({
      version: VersionDtoMapper.mapFromSelectDto(activity_version),
      collection: CollectionDtoMapper.mapFromSelectDto(collections),
    }));
  }

  async listByCollectionParticipation(userId: number, collectionId?: number) {
    const conditions = [
      eq(studentCollectionParticipation.studentId, userId),
      eq(activityVersions.status, VersionStatus.Published),
    ];
    if (collectionId) conditions.push(eq(collections.id, collectionId));

    const res = await db
      .select()
      .from(activityVersions)
      .innerJoin(activities, eq(activities.id, activityVersions.activityId))
      .innerJoin(collections, eq(collections.id, activities.collectionId))
      .innerJoin(
        studentCollectionParticipation,
        eq(studentCollectionParticipation.collectionId, collections.id)
      )
      .where(and(...conditions));

    return res.map(({ activity_version, collections }) => ({
      version: VersionDtoMapper.mapFromSelectDto(activity_version),
      collection: CollectionDtoMapper.mapFromSelectDto(collections),
    }));
  }

  async findSimpleViewById(id: number) {
    const version = (
      await db
        .select()
        .from(activityVersions)
        .where(eq(activityVersions.id, id))
    )[0];

    if (!version) return null;

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

    let questions: Question[] = [];
    if (questionDtos.length) {
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

      questions = questionDtos.map((questionDto) => {
        const question = QuestionDtoMapper.mapFromSelectDto(questionDto);
        question.alternatives = alternativesDtos
          .filter((altDto) => altDto.questionId === questionDto.id)
          .map((dto) => AlternativeDtoMapper.mapFromSelectDto(dto));
        return question;
      });
    }

    return {
      contents: contentDtos.map((dto) =>
        ContentDtoMapper.mapFromSelectDto(dto)
      ),
      questions,
    };
  }

  async findFullViewById(id: number) {
    const version = await this.findSimpleViewById(id);
    if (!version) return null;

    const { questions, contents } = await this.findElementsByVersionId(id);

    return { version, questions, contents };
  }
}
