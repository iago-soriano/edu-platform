import {
  UserDTO,
  TokenDTO
} from "..";

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | null>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  getUserByEmailAndProvider: (email: string, provider: string) => Promise<UserDTO | null>;
  insertUser: (user: UserDTO) => Promise<UserDTO>;
  updateUser: (id: string, user: Partial<UserDTO>) => Promise<boolean>;
}

export interface ITokenRepository {
  getTokenByTokenValue: (
    token: string,
    type: string
  ) => Promise<TokenDTO | null>;
  insertToken: (
    token: TokenDTO
  ) => Promise<TokenDTO>;
  updateToken: (
    id: string,
    data: Partial<TokenDTO>
  ) => Promise<boolean>;
}

