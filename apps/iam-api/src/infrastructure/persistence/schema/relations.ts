import { relations } from "drizzle-orm";
import { users, tokens } from "./tables";

export const tokensRelations = relations(tokens, ({ one }) => ({
  users: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  tokens: many(tokens),
}));
