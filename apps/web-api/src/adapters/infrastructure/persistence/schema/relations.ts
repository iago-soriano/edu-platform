import { relations, type InferSelectModel } from 'drizzle-orm';
import {
  users,
  activities,
  activitiesBlocks,
  answers,
  studentOutputs,
} from './tables';

export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
}));

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  activities: many(activitiesBlocks),
}));

export const answersRelations = relations(answers, ({ one, many }) => ({
  block: one(activitiesBlocks),
}));

export const studentOutputRelations = relations(
  studentOutputs,
  ({ one, many }) => ({
    activityId: one(activities, {
      fields: [studentOutputs.activityId],
      references: [activities.id],
    }),
    requestingUserId: one(users, {
      fields: [studentOutputs.requestingUserId],
      references: [users.id],
    }),
    answers: many(answers),
  }),
);
