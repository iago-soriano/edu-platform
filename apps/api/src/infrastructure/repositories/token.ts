import { IBaseCollection, ITokenRepository, TokenDTO } from "@interfaces";

export class TokenRepository implements ITokenRepository {

    _db: IBaseCollection<TokenDTO>;

    constructor(baseDb: { [tableName: string]: IBaseCollection<TokenDTO> }) {
        this._db = baseDb.Tokens;
    }

    getTokenByTokenValue (token: string, type: string) {
        return this._db.getFirstWhere({ conditions: { token, type }});
    }

    insertToken (token: TokenDTO) {
        return this._db.insertOne(token);
    };

    updateToken (id: string, data: Partial<TokenDTO>) {
        return this._db.partiallyUpdateOne(id, data);
    }
}