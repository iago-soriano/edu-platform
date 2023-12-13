import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { activityPossibleStatus } from "application/domain/activity";
import { contentPossibleTypes } from "@domain";
import { questionPossibleTypes } from "application/domain/question";

/* #region Token */
export const tokenTypeEnum = pgEnum("tokenType", [
  "VerifyAccount",
  "ForgotPassword",
  "ChangePasswordRequest",
]);

export const tokens = pgTable("token", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  value: varchar("value", { length: 256 }),
  type: tokenTypeEnum("token_type"),
  userId: integer("user_id").references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).defaultNow(),
});

export const tokensRelations = relations(tokens, ({ one }) => ({
  users: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
/* #endregion */

/* #region Users */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: varchar("name", { length: 50 }),
  email: varchar("email", { length: 256 }).unique(),
  hashedPassword: varchar("hashed_password", { length: 256 }),
  tokenVersion: integer("token_version"),
  image: varchar("image", { length: 256 }),
  emailVerified: boolean("email_verified"),
  provider: varchar("provider", { length: 50 }),
  providerId: varchar("provider_id", { length: 50 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
  tokens: many(tokens),
}));
/* #endregion */

/* #region Activities */
// export const topics = pgTable("topics", {
//   id: serial("id").primaryKey(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
//   updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
//   label: varchar("label", { length: 50 }),
// });

// export const topicsRelations = relations(topics, ({ many }) => ({
//   activityTopics: many(activityHasTopicsRelationTable),
// }));

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  authorId: integer("author_id").references(() => users.id),
  lastVersionId: integer("last_version_id"),
  draftVersionId: integer("draft_version_id"),
});

export const activitiesRelations = relations(activities, ({ many, one }) => ({
  author: one(users, {
    fields: [activities.authorId],
    references: [users.id],
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
/* #endregion */

/* #region Activity Versions */
export const activityStatusEnum = pgEnum(
  "activityStatus",
  activityPossibleStatus
);

export const activityVersions = pgTable("activity_version", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  status: activityStatusEnum("activity_status").default("Draft"),
  version: integer("version").default(0),

  activityId: integer("activity_id").references(() => activities.id),
});

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
    elements: many(activityVersionHasElementsRelationTable),
  })
);
/* #endregion */

export const contentTypeEnum = pgEnum("contentType", contentPossibleTypes);

export const activityContents = pgTable("activity_contents", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  type: contentTypeEnum("type"),
  content: varchar("content", { length: 500 }),
  description: varchar("description", { length: 500 }),
  title: varchar("title", { length: 100 }),
  order: integer("order").default(0),
  start: integer("start").default(0),
  end: integer("end").default(0),

  parentId: integer("parent_id"), // references this table
  originatingVersionId: integer("originating_version_id").references(
    () => activityVersions.id
  ),
});

export const activityContentsRelations = relations(
  activityContents,
  ({ one, many }) => ({
    versions: many(activityVersionHasElementsRelationTable),
    parent: one(activityQuestions, {
      fields: [activityContents.parentId],
      references: [activityQuestions.id],
    }),
    originatingVersion: one(activityVersions, {
      fields: [activityContents.originatingVersionId],
      references: [activityVersions.id],
    }),
  })
);

export const questionTypeEnum = pgEnum("questionType", questionPossibleTypes);

export const activityQuestions = pgTable("questions", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  type: questionTypeEnum("type"),
  question: varchar("question", { length: 500 }),
  answerKey: varchar("answer_key", { length: 500 }),
  title: varchar("title", { length: 100 }),
  order: integer("order").default(0),

  parentId: integer("parent_id").references(() => activityContents.id),
  originatingVersionId: integer("originating_version_id").references(
    () => activityVersions.id
  ),
});

export const questionsRelations = relations(
  activityQuestions,
  ({ one, many }) => ({
    versions: many(activityVersionHasElementsRelationTable),
    choices: many(choices),
    parent: one(activityQuestions, {
      fields: [activityQuestions.parentId],
      references: [activityQuestions.id],
    }),
    originatingVersion: one(activityVersions, {
      fields: [activityQuestions.originatingVersionId],
      references: [activityVersions.id],
    }),
  })
);

export const choices = pgTable("choices", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  text: varchar("text", { length: 500 }),
  comment: varchar("comment", { length: 500 }),
  label: varchar("label", { length: 2 }),

  questionId: integer("question_id").references(() => activityQuestions.id),
});

export const choicesRelations = relations(choices, ({ one }) => ({
  question: one(activityQuestions, {
    fields: [choices.questionId],
    references: [activityQuestions.id],
  }),
}));

export const activityVersionHasElementsRelationTable = pgTable(
  "version_element_relation",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

    contentId: integer("content_id").references(() => activityContents.id),
    questionId: integer("question_id").references(() => activityQuestions.id),
    versionId: integer("version_id")
      .notNull()
      .references(() => activityVersions.id),
  }
);

export const activityVersionHasElementsRelations = relations(
  activityVersionHasElementsRelationTable,
  ({ one }) => ({
    activityVersion: one(activityVersions, {
      fields: [activityVersionHasElementsRelationTable.versionId],
      references: [activityVersions.id],
    }),
    activityQuestion: one(activityQuestions, {
      fields: [activityVersionHasElementsRelationTable.questionId],
      references: [activityQuestions.id],
    }),
    activityContent: one(activityContents, {
      fields: [activityVersionHasElementsRelationTable.contentId],
      references: [activityContents.id],
    }),
  })
);
