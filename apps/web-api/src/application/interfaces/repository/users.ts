import { User } from "@domain/entities";
import { IAbstractRepository } from "@edu-platform/common/platform";

export interface IUserRepository extends IAbstractRepository {
  getByEmail: (email: string) => Promise<User | null>;
  getById: (id: string) => Promise<User | null>;
}
