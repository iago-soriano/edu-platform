import { IAbstractRepository } from "@edu-platform/common/platform";

export interface IUserRepository extends IAbstractRepository {
  getByEmail: (email: string) => Promise<any | null>;
}
