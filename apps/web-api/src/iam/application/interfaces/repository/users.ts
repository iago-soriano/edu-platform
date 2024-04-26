// import { UserInsertDTO, UserSelectDTO } from "./dtos";

export interface IUserRepository {
  getUserById: (id: number) => Promise<any | null>;
  getUserByIdAndRefreshToken: (
    id: number,
    refreshToken: string
  ) => Promise<any | null>;
  getUserByProviderId: (id: string) => Promise<any | null>;
  getUserByEmail: (email: string) => Promise<any | null>;
  getUserByEmailAndProvider: (
    email: string,
    provider: string
  ) => Promise<any | null>;
  insertUser: (user: any) => Promise<{ userId: number }>;
  updateUser: (id: number, user: Partial<any>) => Promise<boolean>;
}
