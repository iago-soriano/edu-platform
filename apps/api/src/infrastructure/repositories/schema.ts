import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
  primaryKey,
  timestamp,
  pgView,
  PgViewConfig,
} from "drizzle-orm/pg-core";
import { relations, type InferSelectModel } from "drizzle-orm";
import { VersionStatus, QuestionTypes, UserTypes, ContentTypes } from "@domain";

/* #region Tokens */
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
export const userTypeEnum = pgEnum("userType", UserTypes);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: varchar("name", { length: 30 }),
  email: varchar("email", { length: 320 }).unique(),
  hashedPassword: varchar("hashed_password", { length: 100 }),
  refreshToken: varchar("refresh_token", { length: 500 }),
  image: varchar("profile_image", { length: 150 }),
  emailVerified: boolean("email_verified"),
  provider: varchar("provider", { length: 50 }),
  providerId: varchar("provider_id", { length: 50 }),
  type: userTypeEnum("user_type"),
});

export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
  tokens: many(tokens),
}));
/* #endregion */

/* #region Activities */
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
export const versionStatusEnum = pgEnum(
  "activityStatus",
  Object.values(VersionStatus || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const activityVersions = pgTable("activity_version", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  title: varchar("title", { length: 50 }),
  description: varchar("description", { length: 200 }),
  topics: varchar("topics", { length: 200 }),
  status: versionStatusEnum("activity_status").default("Draft"),
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
    questions: many(activityQuestions),
    contents: many(activityContents),
  })
);
/* #endregion */

export const contentTypeEnum = pgEnum(
  "contentType",
  Object.values(ContentTypes || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const activityContents = pgTable("activity_contents", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  type: contentTypeEnum("type"),
  description: varchar("description", { length: 500 }),
  title: varchar("title", { length: 50 }),
  order: integer("order").default(0),
  tracks: varchar("video_tracks", { length: 180 }), // 10 tracks max
  videoUrl: varchar("video_url", { length: 100 }),
  imageUrl: varchar("image_url", { length: 150 }),
  text: varchar("text", { length: 1000 }),

  versionId: integer("version_id").references(() => activityVersions.id),
});

export const activityContentsRelations = relations(
  activityContents,
  ({ one }) => ({
    version: one(activityVersions),
  })
);

export const questionTypeEnum = pgEnum(
  "questionType",
  Object.values(QuestionTypes || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const activityQuestions = pgTable("questions", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  type: questionTypeEnum("type"),

  question: varchar("question", { length: 200 }),
  answer: varchar("answer_key", { length: 500 }),
  order: integer("order").default(0),

  versionId: integer("version_id").references(() => activityVersions.id),
});

// export const testView = pgView("my_view").as(qb => qb.select({ id: activityQuestions.id, answerKey: activityQuestions.answerKey }).from(activityQuestions));
// type ViewType = Pick<InferSelectModel<typeof activityQuestions>, 'id' | 'answerKey'>;

export const questionsRelations = relations(
  activityQuestions,
  ({ one, many }) => ({
    version: one(activityVersions),
    choice: many(alternatives), // TODO: need this?
  })
);

export const alternatives = pgTable("question_alternatives", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  text: varchar("text", { length: 200 }),
  comment: varchar("comment", { length: 500 }),
  isCorrect: boolean("is_correct"),

  questionId: integer("question_id").references(() => activityQuestions.id),
});

export const alternativesRelations = relations(alternatives, ({ one }) => ({
  question: one(activityQuestions, {
    fields: [alternatives.questionId],
    references: [activityQuestions.id],
  }),
}));
