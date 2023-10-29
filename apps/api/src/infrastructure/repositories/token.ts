import {
  IBaseCollection,
  ITokenRepository,
  TokenDTO,
  TokenType,
} from "@interfaces";

export class TokenRepository implements ITokenRepository {
  _db: IBaseCollection<TokenDTO>;

  constructor(baseDb: { [tableName: string]: IBaseCollection<TokenDTO> }) {
    this._db = baseDb.Tokens;
  }

  getTokenByTokenValue(token: string, type: TokenType) {
    return this._db.getFirstWhere({ conditions: { token, type } });
  }

  getTokenByUserId(userId: string, type: TokenType) {
    return this._db.getManyWhere({ conditions: { userId, type }, page: 0 });
  }

  insertToken(token: TokenDTO) {
    return this._db.insertOne(token);
  }

  updateToken(id: string, data: Partial<TokenDTO>) {
    return this._db.partiallyUpdateOne(id, data);
  }

  updateTokenByValue(token: string, data: Partial<TokenDTO>) {
    return this._db.partiallyUpdateOneWhere({ token }, data);
  }
}
