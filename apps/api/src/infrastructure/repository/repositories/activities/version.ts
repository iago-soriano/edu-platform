import { activityContents } from "./../../schema";
import { IVersions, IVersionsRead } from "@interfaces";
import {
  VersionDtoMapper,
  CollectionDtoMapper,
  ContentDtoMapper as ContentDBDtoMapper,
  QuestionDtoMapper as QuestionDBDtoMapper,
} from "../../dto-mappers";
import {
  db,
  activities,
  activityVersions,
  collections,
  studentCollectionParticipation,
  activityQuestions,
  users,
} from "@infrastructure";
import { eq, inArray, and } from "drizzle-orm";
import { VersionStatus, ActivityVersion } from "@domain";
import {
  ContentDtoMapper as ContentControllerDtoMapper,
  QuestionDtoMapper as QuestionControllerDtoMapper,
} from "@dto-mappers";

export class Versions implements IVersions {
  async insert(version: ActivityVersion) {
    version.id = undefined;

    return (
      await db
        .insert(activityVersions)
        .values(VersionDtoMapper.mapToInsertDto(version))
        .returning({ versionId: activityVersions.id })
    )[0];
  }

  async update(version: ActivityVersion) {
    if (!version.id) throw new Error("There must be an id to update");

    await db
      .update(activityVersions)
      .set(VersionDtoMapper.mapToInsertDto(version))
      .where(eq(activityVersions.id, version.id));
  }

  async delete(id: number) {
    await db.delete(activityVersions).where(eq(activityVersions.id, id));
  }

  async findById(versionId: number, activityId: number) {
    const version = (
      await db
        .select()
        .from(activityVersions)
        .innerJoin(activities, eq(activities.id, activityVersions.activityId))
        .innerJoin(users, eq(users.id, activities.authorId))
        .where(
          and(
            eq(activityVersions.id, versionId),
            eq(activityVersions.activityId, activityId)
          )
        )
    )[0];

    return VersionDtoMapper.mapFromSelectDto(
      version.activity_version,
      version.activities,
      version.users
    );
  }
}

export class VersionsRead implements IVersionsRead {
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

  async findFullViewById(versionId: number, activityId: number) {
    const fullVersion = await db
      .select()
      .from(activityVersions)
      .leftJoin(
        activityContents,
        eq(activityContents.versionId, activityVersions.id)
      )
      .leftJoin(
        activityQuestions,
        eq(activityQuestions.versionId, activityVersions.id)
      )
      .orderBy(activityContents.order, activityQuestions.order)
      .innerJoin(activities, eq(activities.id, activityVersions.activityId))
      .leftJoin(collections, eq(activities.collectionId, collections.id))
      .where(
        and(
          eq(activityVersions.id, versionId),
          eq(activityVersions.activityId, activityId)
        )
      );

    if (!fullVersion) return null;

    const sortedElements = fullVersion.map(
      ({ activity_contents, questions }) => {
        const content = // TODO: find better way to do this
          activity_contents &&
          ContentControllerDtoMapper.mapToDto(
            ContentDBDtoMapper.mapFromSelectDto(activity_contents)
          );
        const question =
          questions &&
          QuestionControllerDtoMapper.mapToDto(
            QuestionDBDtoMapper.mapFromSelectDto(questions)
          );
        return {
          content,
          // ...question || {},
        };
      }
    );

    const resp = {
      title: fullVersion[0].activity_version.title || "",
      description: fullVersion[0].activity_version.description || "",
      topics: fullVersion[0].activity_version.topics || "",
      status: fullVersion[0].activity_version.status,
      version: fullVersion[0].activity_version.version,
      collectionName: fullVersion[0].collections?.name || "",
      authorId: fullVersion[0].activities.authorId,
      elements: sortedElements,
    };

    return resp;

    // const contents: Content[] = [];

    // fullVersion.forEach(({ activity_contents }) => {
    //   if (activity_contents)
    //     contents.push(ContentDtoMapper.mapFromSelectDto(activity_contents));
    // });

    // const qs: { [questionId: number]: Question } = {};

    // fullVersion.forEach(({ questions, question_alternatives }) => {
    //   if (!questions) return;

    //   if (!qs[questions.id]) {
    //     qs[questions.id] =
    //       QuestionDtoMapper.mapFromSelectDto(questions) ||
    //       new MultipleChoiceQuestion();
    //   }

    //   if (question_alternatives) {
    //     const alternative = AlternativeDtoMapper.mapFromSelectDto(
    //       question_alternatives
    //     );
    //     if (alternative) qs[questions.id]?.alternatives?.push(alternative);
    //   }
    // });

    // const questions = Object.values(qs);

    // version.contents = contents;
    // version.questions = questions;

    // const version = await this.findSimpleViewById(id);
    // if (!version) return null;

    // const { questions, contents } = await this.findElementsByVersionId(id);

    // return { version, questions, contents };
  }
}
