import Datastore from '@seald-io/nedb';
import { IBaseCollection, IPaginatedParams, UserDTO } from '@application/interfaces';

export class NeDBCollection<P> implements IBaseCollection<P> {
    constructor(private _table: Datastore) {}

    async getOneById (id: string) {
        return await this._table.findOneAsync({ _id: id }) as P;
    }

    async getManyWhere?({ conditions, page, pageSize = 25 }: { conditions: { [field: string]: any }} & IPaginatedParams) {
        return await this._table.findAsync(conditions).skip(page * pageSize).limit(pageSize) as P[]
    }
    getManyByIds?: (ids: string[]) => Promise<P[]>;
    async insertOne (entity: P) {
        return await this._table.insertAsync(entity) as P
    }

    updateOne: (id: string, entity: Partial<P>) => Promise<boolean>;
    insertMany: (entities: P[]) => Promise<boolean>;
}

export class NeDBDatabase {

    _usersDataStore: Datastore;
    Users: IBaseCollection<UserDTO>;

    constructor() {
        this._usersDataStore = new Datastore('db/users.db')
        this._usersDataStore.loadDatabaseAsync();        

        this.Users = new NeDBCollection<UserDTO>(this._usersDataStore);

    }
}

export const nedDb = new NeDBDatabase();
