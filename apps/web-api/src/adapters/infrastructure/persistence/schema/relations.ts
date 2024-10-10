import { relations, type InferSelectModel } from "drizzle-orm";
import {
  users,
  activities,
  activitiesBlocks,
  studentOutputs,
  activitiesGenerated,
} from "./tables";

export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
}));

export const activitiesBlocksRelations = relations(
  activitiesBlocks,
  ({ one, many }) => ({
    activityId: one(activities, {
      fields: [activitiesBlocks.activityId],
      references: [activities.id],
    }),
    activityGeneratedId: one(activitiesGenerated, {
      fields: [activitiesBlocks.activityGeneratedId],
      references: [activitiesGenerated.id],
    }),
  })
);

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
  })
);
