import { activityContents, collectionParticipations } from "../schema/tables";
import { IActivitiesReadRepository } from "@interfaces";
import {
  db,
  activities,
  activityVersions,
  collections,
  activityQuestions,
  users,
} from "@infrastructure";
import { eq, sql, and, desc } from "drizzle-orm";
import { VersionStatus } from "@domain";
import { alias } from "drizzle-orm/pg-core";
import { PaginatedParamsDTO } from "@edu-platform/common";

export class ActivitiesReadRepository implements IActivitiesReadRepository {
  async listForCollectionOwner({
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
        activityId: sql<string>`${activities.id}`.as("activity_id"),
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
          topics: sql<string>`${draftVersions.topics}`.as("draftVersionTopics"),
        },
        published: {
          id: sql<number>`${publishedVersions.id}`.as("publishedVersionId"),
          updatedAt: sql<Date>`${publishedVersions.updatedAt}`.as(
            "publishedUpdatedAt"
          ),
          description: sql<string>`${publishedVersions.description}`.as(
            "publishedVersionDescription"
          ),
          topics: sql<string>`${draftVersions.topics}`.as(
            "publishedVersionTopics"
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
        draftVersions.topics,
        draftVersions.version,
        draftVersions.updatedAt,

        publishedVersions.id,
        publishedVersions.title,
        publishedVersions.description,
        publishedVersions.topics,
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
        collectionName: sq.collectionName || "",
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
        sq.draft.topics,
        sq.published.id,
        sq.published.updatedAt,
        sq.published.title,
        sq.published.description,
        sq.published.topics,
        sq.published.version,
        sq.archivedVersionsCount
      )
      .orderBy(
        desc(sql`GREATEST(${sq.draft.updatedAt}, ${sq.published.updatedAt})`)
      )
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      data: resp.map((dto) => ({
        collectionName: dto.collectionName || "",
        activityId: dto.activityId,
        draft: dto.draft?.id
          ? {
              ...dto.draft,
              title: dto.draft.title || "",
              description: dto.draft.description || "",
              topics: dto.draft.topics || "",
            }
          : null,
        published: dto.published?.id ? dto.published : null,
        archivedVersionsCount: dto.archivedVersionsCount,
      })),
      pagination: {
        totalCount: resp[0]?.totalActivitiesCount,
      },
    };
  }

  async listForCollectionParticipant({
    userId,
    collectionId,
    page,
    pageSize,
  }: {
    userId: number;
    collectionId?: number;
  } & PaginatedParamsDTO) {
    const publishedVersions = alias(activityVersions, "publishedVersions");

    const sq = db
      .select({
        collectionName: collections.name,
        activityId: sql<number>`${activities.id}`.as("activity_id"),

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
      })
      .from(collections)
      .innerJoin(
        collectionParticipations,
        eq(collectionParticipations.collectionId, collections.id)
      )
      .leftJoin(activities, eq(activities.collectionId, collections.id))

      .leftJoin(
        publishedVersions,
        eq(publishedVersions.id, activities.lastVersionId)
      )
      .groupBy(
        collections.id,
        activities.id,

        publishedVersions.id,
        publishedVersions.title,
        publishedVersions.description,
        publishedVersions.version,
        publishedVersions.updatedAt
      )
      .where(
        collectionId
          ? and(
              eq(collectionParticipations.userId, userId), // user participates in collection
              eq(collections.id, collectionId)
            )
          : eq(collectionParticipations.userId, userId)
      )
      .as("sq");

    const resp = await db
      .select({
        collectionName: sq.collectionName || "",
        activityId: sq.activityId,
        published: sq.published,
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
        sq.published.id,
        sq.published.updatedAt,
        sq.published.title,
        sq.published.description,
        sq.published.version
      )
      .orderBy(desc(sql`${sq.published.updatedAt}`))
      .limit(pageSize)
      .offset(page * pageSize);

    return {
      data: resp.map((dto) => ({
        collectionName: dto.collectionName || "",
        activityId: dto.activityId,

        published: dto.published?.id ? dto.published : null,
      })),
      pagination: {
        totalCount: resp[0]?.totalActivitiesCount,
      },
    };
  }

  async findFullDraftViewById(activityId: string, user: { id: number }) {
    const fullVersion = await db
      .select({
        title: activityVersions.title,
        description: activityVersions.description,
        topics: activityVersions.topics,
        collectionName: collections.name,
        collectionId: collections.id,
        version: activityVersions.version,
        contents: {
          type: activityContents.type,
          description: activityContents.description,
          payload: activityContents.payload,
          order: activityContents.order,
        },
        questions: {
          type: activityQuestions.type,
          question: activityQuestions.question,
          alternatives: activityQuestions.alternatives,
          order: activityQuestions.order,
        },
      })
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
      .innerJoin(collections, eq(activities.collectionId, collections.id))
      .where(
        and(
          eq(activityVersions.status, VersionStatus.Draft),
          eq(activities.id, activityId),
          eq(activities.authorId, user.id)
        )
      );

    if (!fullVersion) return null;

    return {
      title: fullVersion[0].title,
      description: fullVersion[0].description,
      topics: fullVersion[0].topics,
      collectionName: fullVersion[0].collectionName,
      collectionId: fullVersion[0].collectionId,
      version: fullVersion[0].version,
      elements: [],
      // contents: {
      //   type: activityContents.type,
      //   description: activityContents.description,
      //   payload: activityContents.payload,
      //   order: activityContents.order,
      // },
      // questions: {
      //   type: activityQuestions.type,
      //   question: activityQuestions.question,
      //   alternatives: activityQuestions.alternatives,
      //   order: activityQuestions.order,
      // },
    };

    // const sortedElements = fullVersion.map(
    //   ({ contents, questions }) => {
    //     const content = // TODO: find better way to do this
    //       activity_contents &&
    //       ContentControllerDtoMapper.mapToDto(
    //         ContentDBDtoMapper.mapFromSelectDto(activity_contents)
    //       );
    //     const question =
    //       questions &&
    //       QuestionControllerDtoMapper.mapToDto(
    //         QuestionDBDtoMapper.mapFromSelectDto(questions)
    //       );
    //     return {
    //       content,
    //       question,
    //       // ...question || {},
    //     };
    //   }
    // );

    const resp = {
      // title: fullVersion[0].activity_versions.title || "",
      // description: fullVersion[0].activity_versions.description || "",
      // topics: fullVersion[0].activity_versions.topics || "",
      // status: fullVersion[0].activity_versions.status,
      // version: fullVersion[0].activity_versions.version,
      // collectionName: fullVersion[0].collections?.name || "",
      // authorId: fullVersion[0].activities.authorId,
      // elements: sortedElements,
    };

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
