import { UserInsertDTO, UserSelectDTO } from "./dtos";

export interface IUserRepository {
  getUserById: (id: number) => Promise<UserSelectDTO | null>;
  getUserByIdAndRefreshToken: (
    id: number,
    refreshToken: string
  ) => Promise<UserSelectDTO | null>;
  getUserByProviderId: (id: string) => Promise<UserSelectDTO | null>;
  getUserByEmail: (email: string) => Promise<UserSelectDTO | null>;
  getUserByEmailAndProvider: (
    email: string,
    provider: string
  ) => Promise<UserSelectDTO | null>;
  insertUser: (user: UserInsertDTO) => Promise<{ userId: number }>;
  updateUser: (id: number, user: Partial<UserSelectDTO>) => Promise<boolean>;
}
