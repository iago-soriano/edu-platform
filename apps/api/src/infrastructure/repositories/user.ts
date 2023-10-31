import { IBaseCollection, IUserRepository, UserDTO } from "@interfaces";
import { db, users } from "@infrastructure";

export class UserRepository implements IUserRepository {
  _db: IBaseCollection<UserDTO>;

  constructor(baseDb: { [tableName: string]: IBaseCollection<UserDTO> }) {
    this._db = baseDb.Users;
  }

  getUserById(id: string) {
    return this._db.getOneById(id);
  }

  getUserByEmail(email: string) {
    return this._db.getFirstWhere({ conditions: { email } });
  }

  getUserByEmailAndProvider(email: string, provider: string) {
    return this._db.getFirstWhere({ conditions: { email, provider } });
  }

  insertUser(user: UserDTO) {
    const resp = db.insert(users).values(user);
  }

  updateUser(id: string, user: Partial<UserDTO>) {
    return this._db.partiallyUpdateOne(id, user);
  }
}
