import { ITokenRepository, TokenInsertDTO, TokenType } from "@interfaces";
import { db, tokens } from "@infrastructure";
import { eq, and } from "drizzle-orm";

export class TokenRepository implements ITokenRepository {
  async getTokenByTokenValue(token: string, type: TokenType) {
    return (
      await db
        .select()
        .from(tokens)
        .where(and(eq(tokens.type, type), eq(tokens.value, token)))
    )[0];
  }

  getTokensByUserId(userId: number, type: TokenType) {
    return db
      .select()
      .from(tokens)
      .where(and(eq(tokens.type, type), eq(tokens.userId, userId)));
  }

  insertToken(token: TokenInsertDTO) {
    return db.insert(tokens).values(token);
  }

  updateTokenByValue(token: string, data: TokenInsertDTO) {
    return db
      .update(tokens)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(tokens.value, token));
  }
}
