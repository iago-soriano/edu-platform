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
import {
  VersionStatus,
  ActivityVersion,
  Question,
  Collection,
  MultipleChoiceQuestion,
  Alternative,
  TextContent,
  Content,
} from "@domain";

export class Versions implements IVersions {
  async insert(
    title: string,
    description: string,
    topics: string,
    activityId: number,
    versionNumber: number = 0
  ) {
    return (
      await db
        .insert(activityVersions)
        .values({
          title,
          description,
          topics,
          activityId,
          version: versionNumber,
        })
        .returning({ versionId: activityVersions.id })
    )[0];
  }

  async update(id: number, activity: Partial<ActivityVersion>) {
    await db
      .update(activityVersions)
      .set({
        ...activity,
        updatedAt: new Date(),
      })
      .where(eq(activityVersions.id, id));
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
      version:
        VersionDtoMapper.mapFromSelectDto(activity_version) ||
        new ActivityVersion(),
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
      version:
        VersionDtoMapper.mapFromSelectDto(activity_version) ||
        new ActivityVersion(),
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

    return VersionDtoMapper.mapFromSelectDto(version);
  }

  async findFullViewById(id: number) {
    const fullVersion = await db
      .select()
      .from(activityVersions)
      .innerJoin(activities, eq(activities.id, activityVersions.activityId))
      .leftJoin(activityContents, eq(activityContents.versionId, id))
      .leftJoin(activityQuestions, eq(activityQuestions.versionId, id))
      .leftJoin(alternatives, ({ questions }) =>
        eq(questions.id, alternatives.questionId)
      )
      .where(eq(activityVersions.id, id));

    if (!fullVersion) return null;

    const version = VersionDtoMapper.mapFromSelectDto(
      fullVersion[0].activity_version
    );

    const contents: Content[] = [];

    fullVersion.forEach(({ activity_contents }) => {
      if (activity_contents)
        contents.push(ContentDtoMapper.mapFromSelectDto(activity_contents));
    });

    const qs: { [questionId: number]: Question } = {};

    fullVersion.forEach(({ questions, question_alternatives }) => {
      if (!questions) return;

      if (!qs[questions.id]) {
        qs[questions.id] =
          QuestionDtoMapper.mapFromSelectDto(questions) ||
          new MultipleChoiceQuestion();
      }

      if (question_alternatives) {
        const alternative = AlternativeDtoMapper.mapFromSelectDto(
          question_alternatives
        );
        if (alternative) qs[questions.id]?.alternatives?.push(alternative);
      }
    });

    const questions = Object.values(qs);

    version.contents = contents;
    version.questions = questions;
    version.activity = ActivityDtoMapper.mapFromSelectDto(
      fullVersion[0].activities
    );

    return version;
    // const version = await this.findSimpleViewById(id);
    // if (!version) return null;

    // const { questions, contents } = await this.findElementsByVersionId(id);

    // return { version, questions, contents };
  }
}
