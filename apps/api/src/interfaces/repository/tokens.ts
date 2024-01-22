import { TokenSelectDTO, TokenInsertDTO, TokenType } from "./dtos";

export interface ITokenRepository {
  getTokenByTokenValue: (
    token: string,
    type: TokenType
  ) => Promise<TokenSelectDTO | null>;
  getTokensByUserId: (
    userId: number,
    type: TokenType
  ) => Promise<TokenSelectDTO[] | null>;
  insertToken: (token: TokenInsertDTO) => Promise<unknown>;
  updateTokenByValue: (
    value: string,
    data: Partial<TokenInsertDTO>
  ) => Promise<unknown>;
}
