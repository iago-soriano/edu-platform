import { relations, type InferSelectModel } from "drizzle-orm";
import {
  users,
  activities,
  activityQuestions,
  activityVersions,
  activityContents,
  studentAnswers,
  studentOutputs,
  notifications,
  collectionParticipations,
  collections,
} from "./tables";

export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  owner: one(users, {
    fields: [collections.ownerId],
    references: [users.id],
  }),
  activities: many(activities),
}));

export const activitiesRelations = relations(activities, ({ many, one }) => ({
  author: one(users, {
    fields: [activities.authorId],
    references: [users.id],
  }),
  collection: one(collections, {
    fields: [activities.collectionId],
    references: [collections.id],
  }),
  lastVersion: one(activityVersions, {
    fields: [activities.lastVersionId],
    references: [activityVersions.id],
    relationName: "lastVersion",
  }),
  draftVersion: one(activityVersions, {
    fields: [activities.draftVersionId],
    references: [activityVersions.id],
    relationName: "openDraft",
  }),
  activityVersions: many(activityVersions),
}));

export const activityVersionsRelations = relations(
  activityVersions,
  ({ one, many }) => ({
    activity: one(activities, {
      fields: [activityVersions.activityId],
      references: [activities.id],
    }),
    lastVersionOf: one(activities, {
      fields: [activityVersions.activityId],
      references: [activities.lastVersionId],
      relationName: "lastVersion",
    }),
    isDraftOf: one(activities, {
      fields: [activityVersions.activityId],
      references: [activities.draftVersionId],
      relationName: "openDraft",
    }),
    questions: many(activityQuestions),
    contents: many(activityContents),
  })
);

export const activityContentsRelations = relations(
  activityContents,
  ({ one }) => ({
    version: one(activityVersions),
  })
);

export const questionsRelations = relations(
  activityQuestions,
  ({ one, many }) => ({
    version: one(activityVersions),
  })
);
