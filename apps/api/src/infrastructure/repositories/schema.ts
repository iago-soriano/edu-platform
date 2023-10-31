import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

// declaring enum in database
export const tokenType = pgEnum("tokenType", [
  "VerifyAccount",
  "ForgotPassword",
]);

export const tokens = pgTable("token", {
  id: serial("id").primaryKey(),
  createdAt: integer("created_at"),
  updatedAt: integer("updated_at"),
  value: varchar("value", { length: 256 }),
  type: tokenType("tokenType"),
  userId: integer("user_id").references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: integer("created_at"),
  updatedAt: integer("updated_at"),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  hashedPassword: varchar("hashed_password", { length: 256 }),
  tokenVersion: integer("token_version"),
  image: varchar("image", { length: 256 }),
  emailVerified: boolean("email_verified"),
  provider: varchar("provider", { length: 256 }),
});

export type NewUser = typeof users.$inferInsert; // insert type
