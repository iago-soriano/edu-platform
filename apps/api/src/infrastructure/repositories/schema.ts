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

// declaring enum in database
export const tokenType = pgEnum("tokenType", [
  "VerifyAccount",
  "ForgotPassword",
  "ChangePasswordRequest",
]);

export const tokens = pgTable("token", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  value: varchar("value", { length: 256 }),
  type: tokenType("token_type"),
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
  email: varchar("email", { length: 256 }),
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

export type NewUser = typeof users.$inferInsert; // insert type

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  label: varchar("label", { length: 50 }),
});

export const topicsRelations = relations(topics, ({ many }) => ({
  activityTopics: many(activityHasTopicsRelationTable),
}));

export const activityStatus = pgEnum("activityStatus", [
  "Draft",
  "Archived",
  "Published",
]);

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  status: activityStatus("activity_status"),

  authorId: integer("author_id").references(() => users.id),
});

export const activitiesRelations = relations(activities, ({ many, one }) => ({
  activityTopics: many(activityHasTopicsRelationTable),
  author: one(users, {
    fields: [activities.authorId],
    references: [users.id],
  }),
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

// export const activityContent = pgTable("activityContent", {
//   id: serial("id").primaryKey(),
//   createdAt: integer("created_at"),
//   updatedAt: integer("updated_at"),
// });
