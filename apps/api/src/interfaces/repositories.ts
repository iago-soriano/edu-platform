import {
  UserInsertDTO,
  UserSelectDTO,
  TokenSelectDTO,
  TokenInsertDTO,
  TokenType,
  ActivityInsertDTO,
  ActivitySelectDTO,
  TopicDTO,
  ActivityContentInsertDTO,
} from "./dtos";

export interface IUserRepository {
  getUserById: (id: number) => Promise<UserSelectDTO | null>;
  getUserByProviderId: (id: string) => Promise<UserSelectDTO | null>;
  getUserByEmail: (email: string) => Promise<UserSelectDTO | null>;
  getUserByEmailAndProvider: (
    email: string,
    provider: string
  ) => Promise<UserSelectDTO | null>;
  insertUser: (user: UserInsertDTO) => Promise<{ userId: number }>;
  updateUser: (id: number, user: Partial<UserSelectDTO>) => Promise<boolean>;
}

export interface ITokenRepository {
  getTokenByTokenValue: (
    token: string,
    type: TokenType
  ) => Promise<TokenSelectDTO | null>;
  getTokensByUserId: (
    userId: number,
    type: TokenType
  ) => Promise<TokenSelectDTO[] | null>;
  insertToken: (token: TokenInsertDTO) => Promise<unknown>;
  updateTokenByValue: (
    value: string,
    data: Partial<TokenInsertDTO>
  ) => Promise<unknown>;
}

export interface IActivitiesRepository {
  insertActivityAndNewVersion: (
    args: ActivityInsertDTO,
    topicIds: number[]
  ) => Promise<{ activityId: number; versionId: number }>;
  getActivityById: (activityId: number) => Promise<ActivitySelectDTO>;
  updateActivity: (
    activityId: number,
    args: ActivityInsertDTO,
    topicIds?: number[]
  ) => Promise<void>;
  insertContent: (
    content: ActivityContentInsertDTO
  ) => Promise<{ contentId: number }>;
}

export interface ITopicsRepository {
  findAllOrThrow: (ids: number[]) => Promise<TopicDTO[]>;
  getAllTopics: () => Promise<TopicDTO[]>;
}
