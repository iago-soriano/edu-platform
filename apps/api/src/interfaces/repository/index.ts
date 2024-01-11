import { ActivityStatusType } from "@domain";
import {
  UserInsertDTO,
  UserSelectDTO,
  TokenSelectDTO,
  TokenInsertDTO,
  TokenType,
  QuestionSelectDTO,
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
  insertNewVersion: (activityId: number) => Promise<{ versionId: number }>;
  updateActivityMetadata: (
    activityId: number,
    args: ActivityInsertDTO
  ) => Promise<void>;
  getActivityById: (activityId: number) => Promise<ActivitySelectDTO>;
  updateActivityVersionMetadata: (
    versionId: number,
    args: ActivityVersionInsertDTO
  ) => Promise<void>;
  insertContent: (
    content: ActivityContentInsertDTO
  ) => Promise<{ contentId: number }>;
  updateContent: (
    contentId: number,
    content: ActivityContentInsertDTO,
    versionId: number
  ) => Promise<void>;
  getVersionById: (versionId: number) => Promise<{
    version: ActivityVersionSelectDTO;
    contents: ActivityContentSelectDTO[];
    questions: QuestionSelectDTO[];
  }>;
  getActivityContentByContentId: (
    contentId: number
  ) => Promise<ActivityContentSelectDTO>;
  getActivityVersionsByAuthorIdAndStatuses: (
    authorId: number,
    statuses: ActivityStatusType[]
  ) => Promise<ActivityVersionSelectDTO[]>;
  insertRelationBetweenVersionAndElement: (
    versionId: number,
    contentId?: number,
    questionId?: number
  ) => Promise<{ relationId: number }>;
  deleteContent: (contentId: number) => Promise<void>;
  deleteContentVersionRelation: (
    contentId: number,
    versionId: number
  ) => Promise<void>;
}
