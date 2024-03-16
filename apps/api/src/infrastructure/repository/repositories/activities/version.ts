import { activityContents } from "../../schema/tables";
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
  collectionParticipations,
  activityQuestions,
  users,
} from "@infrastructure";
import { eq, sql, and, desc } from "drizzle-orm";
import { VersionStatus, ActivityVersion } from "@domain";
import {
  ContentDtoMapper as ContentControllerDtoMapper,
  QuestionDtoMapper as QuestionControllerDtoMapper,
} from "@dto-mappers";
import { alias } from "drizzle-orm/pg-core";
import { PaginatedParamsDTO } from "@edu-platform/common";

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
      version.activity_versions,
      version.activities,
      version.users
    );
  }
}

export class VersionsRead implements IVersionsRead {
  async listByCollectionOwnership({
    userId,
    collectionId,
    page,
    pageSize,
  }: {
    userId: number;
    collectionId?: number;
  } & PaginatedParamsDTO) {
    const draftVersions = alias(activityVersions, "draftVersions");
    const publishedVersions = alias(activityVersions, "publishedVersions");
    const archivedVersions = alias(activityVersions, "archivedVersions");

    const sq = db
      .select({
        collectionName: collections.name,
        activityId: sql<number>`${activities.id}`.as("activity_id"),
        draft: {
          id: sql<number>`${draftVersions.id}`.as("draftVersionId"),
          updatedAt: sql<Date>`${draftVersions.updatedAt}`.as("draftUpdatedAt"),
          description: sql<string>`${draftVersions.description}`.as(
            "draftVersionDescription"
          ),
          title: sql<string>`${draftVersions.title}`.as("draftVersionTitle"),
          version: sql<number>`${draftVersions.version}`.as(
            "draftVersionVersion"
          ),
        },
        published: {
          id: sql<number>`${publishedVersions.id}`.as("publishedVersionId"),
          updatedAt: sql<Date>`${publishedVersions.updatedAt}`.as(
            "publishedUpdatedAt"
          ),
          description: sql<string>`${publishedVersions.description}`.as(
            "publishedVersionDescription"
          ),
          title: sql<string>`${publishedVersions.title}`.as(
            "publishedVersionTitle"
          ),
          version: sql<number>`${publishedVersions.version}`.as(
            "publishedVersionVersion"
          ),
        },
        archivedVersionsCount:
          sql<number>`COUNT(CASE WHEN ${archivedVersions.status} = ${VersionStatus.Archived} THEN 1 END)`.as(
            "archivedVersionsCount"
          ),
      })
      .from(collections)
      .leftJoin(activities, eq(activities.collectionId, collections.id))
      .leftJoin(
        archivedVersions,
        eq(archivedVersions.activityId, activities.id)
      )
      .leftJoin(
        publishedVersions,
        eq(publishedVersions.id, activities.lastVersionId)
      )
      .leftJoin(draftVersions, eq(draftVersions.id, activities.draftVersionId))
      .groupBy(
        collections.id,
        activities.id,

        draftVersions.id,
        draftVersions.updatedAt,
        draftVersions.description,
        draftVersions.version,
        draftVersions.updatedAt,

        publishedVersions.id,
        publishedVersions.title,
        publishedVersions.description,
        publishedVersions.version,
        publishedVersions.updatedAt
      )
      .where(
        collectionId
          ? and(
              eq(collections.ownerId, userId), // user owns collection
              eq(collections.id, collectionId)
            )
          : eq(collections.ownerId, userId)
      )
      .as("sq");

    const resp = await db
      .select({
        collectionName: sq.collectionName,
        activityId: sq.activityId,
        draft: sq.draft,
        published: sq.published,
        archivedVersionsCount: sq.archivedVersionsCount,
        totalActivitiesCount: sql<number>`COUNT(${activities.id}) OVER ()`.as(
          "totalActivitiesCount"
        ),
      })
      .from(sq)
      .innerJoin(activities, eq(activities.id, sq.activityId))
      .groupBy(
        sq.collectionName,
        sq.activityId,
        activities.id,
        sq.draft.id,
        sq.draft.updatedAt,
        sq.draft.title,
        sq.draft.description,
        sq.draft.version,
        sq.published.id,
        sq.published.updatedAt,
        sq.published.title,
        sq.published.description,
        sq.published.version,
        sq.archivedVersionsCount
      )
      .orderBy(
        desc(sql`GREATEST(${sq.draft.updatedAt}, ${sq.published.updatedAt})`)
      )
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      activities: resp.map((dto) => ({
        collectionName: dto.collectionName,
        activityId: dto.activityId,
        draft: dto.draft?.id ? dto.draft : null,
        published: dto.published?.id ? dto.published : null,
        archivedVersionsCount: dto.archivedVersionsCount,
      })),
      pagination: {
        totalRowCount: resp[0]?.totalActivitiesCount,
      },
    };
  }

  async listByCollectionParticipation(userId: number, collectionId?: number) {
    const conditions = [
      eq(collectionParticipations.userId, userId),
      eq(activityVersions.status, VersionStatus.Published),
    ];
    if (collectionId) conditions.push(eq(collections.id, collectionId));

    const res = await db
      .select()
      .from(activityVersions)
      .innerJoin(activities, eq(activities.id, activityVersions.activityId))
      .innerJoin(collections, eq(collections.id, activities.collectionId))
      .innerJoin(
        collectionParticipations,
        eq(collectionParticipations.collectionId, collections.id)
      )
      .where(and(...conditions));

    return res.map(({ activity_versions, collections }) => ({
      version:
        VersionDtoMapper.mapFromSelectDto(activity_versions) ||
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
      title: fullVersion[0].activity_versions.title || "",
      description: fullVersion[0].activity_versions.description || "",
      topics: fullVersion[0].activity_versions.topics || "",
      status: fullVersion[0].activity_versions.status,
      version: fullVersion[0].activity_versions.version,
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
