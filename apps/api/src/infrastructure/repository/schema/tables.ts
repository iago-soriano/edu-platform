import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  primaryKey,
  uuid,
  json,
} from "drizzle-orm/pg-core";
import {
  VersionStatus,
  QuestionTypes,
  UserTypes,
  ContentTypes,
  OutputStatus,
  NotificationType,
} from "@domain";

export const tokenTypeEnum = pgEnum("tokenType", [
  "VerifyAccount",
  "ForgotPassword",
  "ChangePasswordRequest",
]);

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  value: varchar("value", { length: 256 }),
  type: tokenTypeEnum("token_type"),
  userId: integer("user_id").references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).defaultNow(),
});

export const userTypeEnum = pgEnum("userType", UserTypes);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  name: varchar("name", { length: 30 }).notNull(),
  email: varchar("email", { length: 320 }).unique().notNull(),
  hashedPassword: varchar("hashed_password", { length: 100 }),
  refreshToken: varchar("refresh_token", { length: 500 }),
  image: varchar("profile_image", { length: 150 }),
  emailVerified: boolean("email_verified"),
  provider: varchar("provider", { length: 50 }),
  providerId: varchar("provider_id", { length: 50 }),
  type: userTypeEnum("user_type"),
});

export const activities = pgTable("activities", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  collectionId: integer("collection_id")
    .references(() => collections.id)
    .notNull(),
  lastVersionId: uuid("last_version_id"),
  draftVersionId: uuid("draft_version_id"),
});

export const versionStatusEnum = pgEnum(
  "activityStatus",
  Object.values(VersionStatus || {}).filter((v) => isNaN(Number(v))) as [string]
);
export const activityVersions = pgTable("activity_versions", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 200 }).notNull(),
  topics: varchar("topics", { length: 200 }).notNull(),
  status: versionStatusEnum("activity_status").default("Draft").notNull(),
  version: integer("version").default(0).notNull(),

  activityId: uuid("activity_id")
    .references(() => activities.id)
    .notNull(),
});

export const contentTypeEnum = pgEnum(
  "contentType",
  Object.values(ContentTypes || {}).filter((v) => isNaN(Number(v))) as [string]
);
export const activityContents = pgTable("activity_contents", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  type: contentTypeEnum("type").notNull(),
  description: varchar("description", { length: 500 }).default("").notNull(),
  order: integer("order").default(0).notNull(),
  payload: json("payload").notNull(),

  versionId: uuid("version_id")
    .references(() => activityVersions.id)
    .notNull(),
});

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

  versionId: uuid("version_id").references(() => activityVersions.id),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  name: varchar("name", { length: 50 }).default("").notNull(),
  description: varchar("description", { length: 200 }).default("").notNull(),

  ownerId: integer("owner_id")
    .references(() => users.id)
    .notNull(),
  isPrivate: boolean("is_private").default(true).notNull(),
  notifyOwnerOnStudentOutput: boolean("notify_owner_on_student_output")
    .default(true)
    .notNull(),
});

export const participantTypeEnum = pgEnum("participantType", [
  "Follower",
  "Student",
]);

export const collectionParticipations = pgTable(
  "collection_participations",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    collectionId: integer("collection_id")
      .notNull()
      .references(() => collections.id),
    type: participantTypeEnum("participantType").notNull(),
    notifyOnActivityInsert: boolean("notify_on_activity_insert")
      .default(true)
      .notNull(),
  }
  // (table) => {
  //   return {
  //     pk: primaryKey({
  //       columns: [table.collectionId, table.userId, table.type],
  //     }),
  //   };
  // }
);

// student output
export const studentOutputStatusEnum = pgEnum(
  "studentOutputStatus",
  Object.values(OutputStatus || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const studentOutputs = pgTable("student_outputs", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  status: studentOutputStatusEnum("status")
    .default(OutputStatus.Draft)
    .notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  versionId: uuid("version_id")
    .notNull()
    .references(() => activityVersions.id),
});

export const studentAnswers = pgTable("student_answers", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  questionId: integer("question_id")
    .references(() => activityQuestions.id)
    .notNull(),
  answer: varchar("answer", { length: 500 }),
  studentOutputId: integer("student_output_id")
    .references(() => studentOutputs.id)
    .notNull(),
});

export const notificationTypeEnum = pgEnum(
  "notificationType",
  Object.values(NotificationType || {}).filter((v) => isNaN(Number(v))) as [
    string,
  ]
);

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  isNew: boolean("is_new").default(true).notNull(),
  type: notificationTypeEnum("notificationType").notNull(),
  message: varchar("message", { length: 250 }).notNull(),
  details: varchar("details", { length: 500 }).notNull(),
});
