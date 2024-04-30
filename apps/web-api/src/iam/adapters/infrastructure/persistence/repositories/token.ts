import { ITokenRepository } from "@iam/application/interfaces";
import { db, tokens } from "../schema";
import { eq, and } from "drizzle-orm";

export class TokenRepository implements ITokenRepository {
  async getTokenByTokenValue(token: string, type: any) {
    return (
      await db
        .select()
        .from(tokens)
        .where(and(eq(tokens.type, type), eq(tokens.value, token)))
    )[0];
  }

  getTokensByUserId(userId: string, type: any) {
    return db
      .select()
      .from(tokens)
      .where(and(eq(tokens.type, type), eq(tokens.userId, userId)));
  }

  insertToken(token: any) {
    return db.insert(tokens).values(token);
  }

  updateTokenByValue(token: string, data: any) {
    return db
      .update(tokens)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tokens.value, token));
  }
}
