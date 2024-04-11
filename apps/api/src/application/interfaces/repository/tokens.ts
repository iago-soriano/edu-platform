// import { TokenSelectDTO, TokenInsertDTO, TokenType } from "./dtos";

export interface ITokenRepository {
  getTokenByTokenValue: (token: string, type: any) => Promise<any | null>;
  getTokensByUserId: (userId: number, type: any) => Promise<any[] | null>;
  insertToken: (token: any) => Promise<unknown>;
  updateTokenByValue: (value: string, data: Partial<any>) => Promise<unknown>;
}
