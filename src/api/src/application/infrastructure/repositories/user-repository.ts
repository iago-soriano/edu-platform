import { IBaseCollection, IUserRepository, UserDTO } from "@application/interfaces";

export class UserRepository implements IUserRepository {

    _db: IBaseCollection<UserDTO>;

    constructor(baseDb: { [tableName: string]: IBaseCollection<UserDTO> }) {
        this._db = baseDb.Users;
    }

    getUserById (id: string) {
        return this._db.getOneById(id);
    }

    getUserByEmail: (email: string) => Promise<UserDTO | null>;
    insertUser: (user: UserDTO) => Promise<UserDTO>;
    updateUser: (id: string, user: Partial<UserDTO>) => Promise<UserDTO>;
}