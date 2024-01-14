import {
  users,
  tokens,
  tokenTypeEnum,
  activities,
  activityVersions,
  activityContents,
  contentTypeEnum,
  questionTypeEnum,
  activityQuestions,
} from "@infrastructure";

export type UserSelectDTO = typeof users.$inferSelect;
export type UserInsertDTO = typeof users.$inferInsert;

export type TokenType = (typeof tokenTypeEnum.enumValues)[number];

export type TokenSelectDTO = typeof tokens.$inferSelect;
export type TokenInsertDTO = typeof tokens.$inferInsert;

export type ActivityInsertDTO = typeof activities.$inferInsert;
export type ActivitySelectDTO = typeof activities.$inferSelect;

export type ActivityVersionInsertDTO = typeof activityVersions.$inferInsert;
export type ActivityVersionSelectDTO = typeof activityVersions.$inferSelect;

export const ActivityContentEnum = typeof contentTypeEnum.enumValues;
export type ActivityContentInsertDTO = typeof activityContents.$inferInsert;
export type ActivityContentSelectDTO = typeof activityContents.$inferSelect;

export const QuestionTypeEnum = typeof questionTypeEnum.enumValues;
export type QuestionInsertDTO = typeof activityQuestions.$inferInsert;
export type QuestionSelectDTO = typeof activityQuestions.$inferSelect;

export type CompleteVersionSelectDTO = {
  version: ActivityVersionSelectDTO;
  contents: ActivityContentSelectDTO[];
  questions: QuestionSelectDTO[];
};
