import { ActivityStatusType } from "@domain";
import {
  QuestionSelectDTO,
  ActivitySelectDTO,
  ActivityVersionInsertDTO,
  ActivityContentInsertDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
  ActivityInsertDTO,
} from "./dtos";

export interface IActivities {
  insert: (authorId: number) => Promise<{ activityId: number }>;
  update: (activityId: number, args: ActivityInsertDTO) => Promise<void>;
  findById: (activityId: number) => Promise<ActivitySelectDTO>;
}

export interface IContents {
  insert: (content: ActivityContentInsertDTO) => Promise<{ contentId: number }>;
  update: (
    contentId: number,
    content: ActivityContentInsertDTO,
    versionId: number
  ) => Promise<void>;
  findById: (contentId: number) => Promise<ActivityContentSelectDTO>;
  delete: (contentId: number) => Promise<void>;
}

export interface IVersionElements {
  insert: (
    versionId: number,
    contentId?: number,
    questionId?: number
  ) => Promise<{ relationId: number }>;
  delete: (contentId: number, versionId: number) => Promise<void>;
}

export interface IVersions {
  insert: (activityId: number) => Promise<{ versionId: number }>;
  update: (versionId: number, args: ActivityVersionInsertDTO) => Promise<void>;
  findSimpleViewById: (versionId: number) => Promise<ActivityVersionSelectDTO>;
  findElementsByVersionId: (versionId: number) => Promise<{
    contents: ActivityContentSelectDTO[];
    questions: QuestionSelectDTO[];
  }>;
  listByAuthorIdAndStatuses: (
    authorId: number,
    statuses: ActivityStatusType[]
  ) => Promise<ActivityVersionSelectDTO[]>;
}

export interface IActivitiesRepository {
  Activities: IActivities;
  Contents: IContents;
  Versions: IVersions;
  VersionElements: IVersionElements;
}
