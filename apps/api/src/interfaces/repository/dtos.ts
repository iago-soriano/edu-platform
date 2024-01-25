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
  alternatives,
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

export type AlternativeInsertDTO = typeof alternatives.$inferInsert;
export type AlternativeSelectDTO = typeof alternatives.$inferInsert;

export type CompleteQuestionInsertDTO = {
  question: QuestionInsertDTO;
  alternatives?: AlternativeInsertDTO[];
};
export type CompleteQuestionSelectDTO = {
  question: QuestionSelectDTO;
  alternatives?: AlternativeSelectDTO[];
};
