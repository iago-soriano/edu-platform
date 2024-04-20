import { IUserRepository } from "@application/interfaces";
import {
  db,
  users,
} from "../../../../../core-api/src/infrastructure/persistence/schema";
import { eq, and } from "drizzle-orm";

export class UserRepository implements IUserRepository {
  async getUserById(id: number) {
    return (await db.select().from(users).where(eq(users.id, id)))[0];
  }

  async getUserByIdAndRefreshToken(id: number, refreshToken: string) {
    return (
      await db
        .select()
        .from(users)
        .where(and(eq(users.id, id), eq(users.refreshToken, refreshToken)))
    )[0];
  }

  async getUserByProviderId(id: string) {
    return (await db.select().from(users).where(eq(users.providerId, id)))[0];
  }

  async getUserByEmail(email: string) {
    return (await db.select().from(users).where(eq(users.email, email)))[0];
  }

  async getUserByEmailAndProvider(email: string, provider: string) {
    return (
      await db
        .select()
        .from(users)
        .where(and(eq(users.email, email), eq(users.provider, provider)))
    )[0];
  }

  async insertUser(user: any) {
    return (
      await db.insert(users).values(user).returning({ userId: users.id })
    )[0];
  }

  async updateUser(id: number, user: Partial<any>) {
    return !!(
      await db
        .update(users)
        .set({ ...user, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning({ userId: users.id })
    )[0];
  }
}
