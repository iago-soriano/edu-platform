import Datastore from "nedb-promises";
import {
  IBaseCollection,
  IPaginatedParams,
  TokenDTO,
  UserDTO,
} from "@interfaces";

export class NeDBCollection<P> implements IBaseCollection<P> {
  constructor(private _table: Datastore<P>) {}

  async getOneById(id: string) {
    return (await this._table.findOne({ id })) as P;
  }

  async getOneByInternalId(id: string) {
    return (await this._table.findOne({ _id: id })) as P;
  }

  async getFirstWhere({
    conditions,
    page,
    pageSize = 25,
  }: { conditions: { [field: string]: any } } & IPaginatedParams) {
    const res = await this._table
      .find(conditions)
      .skip(page * pageSize)
      .limit(pageSize);
    return (res as P[])[0];
  }

  async getManyWhere?({
    conditions,
    page,
    pageSize = 25,
  }: { conditions: { [field: string]: any } } & IPaginatedParams) {
    return (await this._table
      .find(conditions)
      .skip(page * pageSize)
      .limit(pageSize)) as P[];
  }

  getManyByIds?: (ids: string[]) => Promise<P[]>;
  async insertOne(entity: P) {
    return (await this._table.insert(entity)) as P;
  }

  async partiallyUpdateOne(id: string, entity: Partial<P>) {
    return (await this._table.update({ id }, { $set: entity })) == 1;
    // return await this._table.update({ _id: id }, { $set: entity }) == 1;
  }

  async partiallyUpdateOneWhere(
    conditions: { [field: string]: any },
    entity: Partial<P>
  ) {
    return (await this._table.update(conditions, { $set: entity })) == 1;
    // return await this._table.update({ _id: id }, { $set: entity }) == 1;
  }

  insertMany: (entities: P[]) => Promise<boolean>;
}

export class NeDBDatabase {
  Users: IBaseCollection<UserDTO>;
  Tokens: IBaseCollection<TokenDTO>;

  constructor() {
    this.Users = new NeDBCollection<UserDTO>(
      Datastore.create({ filename: `db/Users.db`, autoload: true })
    );
    this.Tokens = new NeDBCollection<TokenDTO>(
      Datastore.create({ filename: `db/Tokens.db`, autoload: true })
    );
  }
}

export const nedDb = new NeDBDatabase();
