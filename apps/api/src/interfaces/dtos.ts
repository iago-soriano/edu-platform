import {
  users,
  tokens,
  tokenTypeEnum,
  topics,
  activities,
  activityStatusEnum,
  activityVersions,
} from "@infrastructure";

export type UserSelectDTO = typeof users.$inferSelect;
export type UserInsertDTO = typeof users.$inferInsert;

export type TokenType = (typeof tokenTypeEnum.enumValues)[number];

export type TokenSelectDTO = typeof tokens.$inferSelect;
export type TokenInsertDTO = typeof tokens.$inferInsert;

export type TopicDTO = typeof topics.$inferSelect;

export type ActivityInsertDTO = typeof activities.$inferInsert;
export type ActivitySelectDTO = typeof activities.$inferSelect;

export type ActivityStatusType = (typeof activityStatusEnum.enumValues)[number];
export const ActivityStatusEnum = activityStatusEnum.enumValues;

export type ActivityVersionInsertDTO = typeof activityVersions.$inferSelect;
export type ActivityVersionSelectDTO = typeof activityVersions.$inferInsert;
