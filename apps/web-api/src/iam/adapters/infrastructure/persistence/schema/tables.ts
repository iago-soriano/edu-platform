import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { TokenTypes } from "@iam/domain/enums";

export const tokenTypeEnum = pgEnum(
  "tokenType",
  Object.values(TokenTypes || {}).filter((v) => isNaN(Number(v))) as [string]
);

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),

  value: varchar("value", { length: 256 }),
  type: tokenTypeEnum("token_type"),
  userId: integer("user_id").references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).defaultNow(),
});

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
});
