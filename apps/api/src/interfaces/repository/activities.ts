import { VersionStatus } from "@domain";
import {
  QuestionSelectDTO,
  ActivitySelectDTO,
  ActivityVersionInsertDTO,
  ActivityContentInsertDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
  ActivityInsertDTO,
  QuestionInsertDTO,
  CompleteQuestionInsertDTO,
  CompleteQuestionSelectDTO,
  AlternativeInsertDTO,
  AlternativeSelectDTO,
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

export interface IQuestions {
  insert: (args: CompleteQuestionInsertDTO) => Promise<{ questionId: number }>;
  insertAlternative: (
    alternative: AlternativeInsertDTO
  ) => Promise<{ alternativeId: number }>;
  update: (
    questionId: number,
    question: CompleteQuestionInsertDTO
  ) => Promise<void>;
  updateAlternative: (
    alternativeId: number,
    alternative: AlternativeInsertDTO
  ) => Promise<void>;
  findById: (questionId: number) => Promise<CompleteQuestionSelectDTO>;
  // findQuestionAndAlternativesById: (questionId: number) => Promise<{
  //   question: QuestionSelectDTO;
  //   alternatives: AlternativeSelectDTO[];
  // }>;
  delete: (questionId: number) => Promise<void>;
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
  insert: (
    activityId: number,
    versionNumber?: number
  ) => Promise<{ versionId: number }>;
  update: (versionId: number, args: ActivityVersionInsertDTO) => Promise<void>;
  delete: (versionId: number) => Promise<void>;
  findSimpleViewById: (versionId: number) => Promise<ActivityVersionSelectDTO>;
  findFullViewById: (versionId: number) => Promise<{
    version: ActivityVersionSelectDTO;
    contents: ActivityContentSelectDTO[];
    questions: QuestionSelectDTO[];
  }>;
  findElementsByVersionId: (versionId: number) => Promise<{
    contents: ActivityContentSelectDTO[];
    questions: QuestionSelectDTO[];
  }>;
  listByAuthorIdAndStatuses: (
    authorId: number,
    statuses: VersionStatus[]
  ) => Promise<ActivityVersionSelectDTO[]>;
}

export interface IActivitiesRepository {
  Activities: IActivities;
  Contents: IContents;
  Versions: IVersions;
  Questions: IQuestions;
}
