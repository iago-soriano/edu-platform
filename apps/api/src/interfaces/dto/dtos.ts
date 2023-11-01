import { users, tokens, tokenType } from "@infrastructure";

export type UserSelectDTO = typeof users.$inferSelect;
export type UserInsertDTO = typeof users.$inferInsert;

export type TokenType =
  | (typeof tokenType.enumValues)[0]
  | (typeof tokenType.enumValues)[1]
  | (typeof tokenType.enumValues)[2];

export type TokenSelectDTO = typeof tokens.$inferSelect;
export type TokenInsertDTO = typeof tokens.$inferInsert;
