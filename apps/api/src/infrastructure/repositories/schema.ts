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
import { contentPossibleType } from "@domain";

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
  expiresAt: integer("expires_at"),
});

export const tokensRelations = relations(tokens, ({ one }) => ({
  users: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));

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

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  label: varchar("label", { length: 50 }),
});

export const topicsRelations = relations(topics, ({ many }) => ({
  activityTopics: many(activityHasTopicsRelationTable),
}));

export const activityStatusEnum = pgEnum(
  "activityStatus",
  activityPossibleStatus
);

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  status: activityStatusEnum("activity_status").default("Draft"),

  authorId: integer("author_id").references(() => users.id),
  lastVersionId: integer("last_version_id"),
});

export const activitiesRelations = relations(activities, ({ many, one }) => ({
  activityTopics: many(activityHasTopicsRelationTable),
  author: one(users, {
    fields: [activities.authorId],
    references: [users.id],
  }),
  lastVersion: one(activityVersions, {
    fields: [activities.lastVersionId],
    references: [activityVersions.id],
  }),
  activityVersions: many(activityVersions),
}));

export const activityHasTopicsRelationTable = pgTable(
  "topic_activity_relation",
  {
    activityId: integer("activity_id")
      .notNull()
      .references(() => activities.id),
    topicId: integer("topic_id")
      .notNull()
      .references(() => topics.id),
  },
  (t) => ({
    pk: primaryKey(t.activityId, t.topicId),
  })
);

export const activityHasTopicsRelations = relations(
  activityHasTopicsRelationTable,
  ({ one }) => ({
    activity: one(activities, {
      fields: [activityHasTopicsRelationTable.activityId],
      references: [activities.id],
    }),
    topic: one(topics, {
      fields: [activityHasTopicsRelationTable.topicId],
      references: [topics.id],
    }),
  })
);

export const activityVersions = pgTable("activity_version", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  version: integer("version").default(0),
  activityId: integer("activity_id").references(() => activities.id),
});

export const activityVersionsRelations = relations(
  activityVersions,
  ({ one, many }) => ({
    activity: one(activities, {
      fields: [activityVersions.activityId],
      references: [activities.id],
      relationName: "allVersions",
    }),
    activityContents: many(activityContents),
  })
);

export const contentTypeEnum = pgEnum("contentType", contentPossibleType);

export const activityContents = pgTable("activity_contents", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  type: contentTypeEnum("type"),
  content: varchar("content", { length: 500 }),
  description: varchar("description", { length: 500 }),
  title: varchar("title", { length: 50 }),
  activityVersionId: integer("activity_version_id").references(
    () => activityVersions.id
  ),
});

export const activityContentsRelations = relations(
  activityContents,
  ({ one }) => ({
    activityVersion: one(activityVersions, {
      fields: [activityContents.activityVersionId],
      references: [activityVersions.id],
    }),
  })
);
