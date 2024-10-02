import {
  integer,
  pgEnum,
  pgTable,
  varchar,
  timestamp,
  uuid,
  jsonb,
} from 'drizzle-orm/pg-core';

import {
  ActivityBlockType,
  ActivityFormat,
  ActivityLevel,
  ActivityStatus,
  Languages,
  OutputStatus,
} from 'domain/entities/enums';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  email: varchar('email', { length: 30 }).notNull(),
  counter: integer('counter'),
});

export const languagesEnum = pgEnum(
  'language',
  Object.values(Languages || {}).filter((v) => isNaN(Number(v))) as [string],
);

export const formatEnum = pgEnum(
  'format',
  Object.values(ActivityFormat || {}).filter((v) => isNaN(Number(v))) as [
    string,
  ],
);

export const levelEnum = pgEnum(
  'level',
  Object.values(ActivityLevel || {}).filter((v) => isNaN(Number(v))) as [string],
);

export const statusEnum = pgEnum(
  'status',
  Object.values(ActivityStatus || {}).filter((v) => isNaN(Number(v))) as [
    string,
  ],
);

export const activities = pgTable('activities', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  requestingUserId: varchar('request_user_id', { length: 50 }).notNull(),
  language: languagesEnum('language').notNull(),
  topics: varchar('topics').array().notNull(),
  format: formatEnum('format').notNull(),
  level: formatEnum('level').notNull(),
  status: formatEnum('status').notNull(),
});

export const typeEnum = pgEnum(
  'type',
  Object.values(ActivityBlockType || {}).filter((v) => isNaN(Number(v))) as [
    string,
  ],
);

export const activitiesBlocks = pgTable('activitiesBlocks', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  type: typeEnum('type').notNull(),
  data: jsonb('data'),
});

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  blockId: varchar('blockId').references(() => activitiesBlocks.id),
  answer: varchar('answer', { length: 500 }),
  review: varchar('review', { length: 500 }),
});

export const outputStatusEnum = pgEnum(
  'status',
  Object.values(OutputStatus || {}).filter((v) => isNaN(Number(v))) as [string],
);

export const studentOutputs = pgTable('studentOutput', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  requestingUserId: varchar('request_user_id', { length: 50 }).notNull(),
  activityId: varchar('activityId')
    .references(() => activities.id)
    .notNull(),
  studentEmail: varchar('student_email', { length: 30 }).notNull(),
  status: outputStatusEnum('status').notNull(),
});
