import {
  VersionStatus,
  Content,
  Activity,
  ActivityVersion,
  Question,
  TextQuestion,
  MultipleChoiceQuestion,
  // Alternative,
} from "@domain";

export interface IActivities {
  insert: (authorId: number) => Promise<{ activityId: number }>;
  update: (activityId: number, activity: Partial<Activity>) => Promise<void>;
  findById: (activityId: number) => Promise<Activity>;
}

export interface IContents {
  insert: (content: Content) => Promise<{ contentId: number }>;
  update: (
    contentId: number,
    content: Partial<Content>,
    versionId: number
  ) => Promise<void>;
  findById: (contentId: number) => Promise<Content>;
  delete: (contentId: number) => Promise<void>;
}

export interface IQuestions {
  insert: (
    args: Question
  ) => Promise<{ questionId: number; alternativesIds: number[] }>;
  update: (questionId: number, question: Question) => Promise<void>;
  findById: (questionId: number) => Promise<Question>;
  delete: (questionId: number) => Promise<void>;
}

export interface IVersions {
  insert: (
    activityId: number,
    versionNumber?: number
  ) => Promise<{ versionId: number }>;
  update: (versionId: number, args: Partial<ActivityVersion>) => Promise<void>;
  delete: (versionId: number) => Promise<void>;
  findSimpleViewById: (versionId: number) => Promise<ActivityVersion | null>;
  findFullViewById: (versionId: number) => Promise<{
    version: ActivityVersion;
    contents: Content[];
    questions: Question[];
  } | null>;
  findElementsByVersionId: (versionId: number) => Promise<{
    contents: Content[];
    questions: Question[];
  }>;
  listByAuthorIdAndStatuses: (
    authorId: number,
    statuses: VersionStatus[]
  ) => Promise<ActivityVersion[]>;
}

export interface IActivitiesRepository {
  Activities: IActivities;
  Contents: IContents;
  Versions: IVersions;
  Questions: IQuestions;
}
