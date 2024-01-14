import { ActivityStatusType } from "@domain";
import {
  UserInsertDTO,
  UserSelectDTO,
  TokenSelectDTO,
  TokenInsertDTO,
  TokenType,
  CompleteVersionSelectDTO,
  ActivitySelectDTO,
  ActivityVersionInsertDTO,
  ActivityContentInsertDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
  ActivityInsertDTO,
} from "./dtos";

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
  insertActivity: (authorId: number) => Promise<{ activityId: number }>;
  insertVersion: (activityId: number) => Promise<{ versionId: number }>;
  insertContent: (
    content: ActivityContentInsertDTO
  ) => Promise<{ contentId: number }>;
  insertRelationBetweenVersionAndElement: (
    versionId: number,
    contentId?: number,
    questionId?: number
  ) => Promise<{ relationId: number }>;

  updateActivity: (
    activityId: number,
    args: ActivityInsertDTO
  ) => Promise<void>;
  updateActivityVersion: (
    versionId: number,
    args: ActivityVersionInsertDTO
  ) => Promise<void>;
  updateContent: (
    contentId: number,
    content: ActivityContentInsertDTO,
    versionId: number
  ) => Promise<void>;

  findActivityById: (activityId: number) => Promise<ActivitySelectDTO>;
  findVersionById: (versionId: number) => Promise<CompleteVersionSelectDTO>;
  findActivityContentById: (
    contentId: number
  ) => Promise<ActivityContentSelectDTO>;
  findActivityVersionsByAuthorIdAndStatuses: (
    authorId: number,
    statuses: ActivityStatusType[]
  ) => Promise<ActivityVersionSelectDTO[]>;

  deleteContent: (contentId: number) => Promise<void>;
  deleteContentVersionRelation: (
    contentId: number,
    versionId: number
  ) => Promise<void>;
}
