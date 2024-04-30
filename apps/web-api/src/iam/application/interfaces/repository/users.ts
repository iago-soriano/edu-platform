// import { UserInsertDTO, UserSelectDTO } from "./dtos";

export interface IUserRepository {
  getUserById: (id: string) => Promise<any | null>;
  getUserByIdAndRefreshToken: (
    id: string,
    refreshToken: string
  ) => Promise<any | null>;
  getUserByProviderId: (id: string) => Promise<any | null>;
  getUserByEmail: (email: string) => Promise<any | null>;
  getUserByEmailAndProvider: (
    email: string,
    provider: string
  ) => Promise<any | null>;
  insertUser: (user: any) => Promise<{ userId: string }>;
  updateUser: (id: string, user: Partial<any>) => Promise<boolean>;
}
