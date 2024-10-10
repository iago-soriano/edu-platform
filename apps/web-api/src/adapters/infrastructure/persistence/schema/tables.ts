import {
  ActivityBlockType,
  ActivityLevel,
  ActivityStatus,
  ActivityType,
  Languages,
  OutputStatus,
} from "@edu-platform/common/domain/domain/enums";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),

  email: varchar("email", { length: 255 }).notNull(),
  counter: integer("counter"),
  subscriptionEndsAt: timestamp("subscription_ends_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const languagesEnum = pgEnum(
  "language",
  Object.values(Languages || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const typeEnum = pgEnum(
  "type",
  Object.values(ActivityType || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const levelEnum = pgEnum(
  "level",
  Object.values(ActivityLevel || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const statusEnum = pgEnum(
  "status",
  Object.values(ActivityStatus || {}).filter((v) => isNaN(Number(v))) as [
    string,
  ]
);

export const activitiesGenerated = pgTable("activitiesGenerated", {
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  language: languagesEnum("language").notNull(),
  topics: varchar("topics").array().notNull(),
  type: typeEnum("type").notNull(),
  level: levelEnum("level").notNull(),
  status: statusEnum("status").notNull(),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  requestingUserId: varchar("requesting_user_id")
    .references(() => users.id)
    .notNull(),

  activityGeneratedId: varchar("activity_base_id")
    .references(() => activitiesGenerated.id)
    .notNull(),
  title: varchar("title", { length: 100 }),
});

export const blockTypeEnum = pgEnum(
  "blockType",
  Object.values(ActivityBlockType || {}).filter((v) => isNaN(Number(v))) as [
    string,
  ]
);

export const activitiesBlocks = pgTable("activitiesBlocks", {
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  activityGeneratedId: varchar("activity_base_id").references(
    () => activitiesGenerated.id
  ),
  activityId: varchar("activity_id").references(() => activities.id),
  type: blockTypeEnum("blockType").notNull(),
  data: jsonb("data"),
});

export const outputStatusEnum = pgEnum(
  "status",
  Object.values(OutputStatus || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const studentOutputs = pgTable("studentOutput", {
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  requestingUserId: varchar("request_user_id").notNull(),
  activityId: varchar("activityId")
    .references(() => activities.id)
    .notNull(),
  studentEmail: varchar("student_email").notNull(),
  status: outputStatusEnum("status").notNull(),
  answers: jsonb("answers"),
});
