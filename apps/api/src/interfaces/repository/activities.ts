import {
  VersionStatus,
  Content,
  Activity,
  ActivityVersion,
  Question,
  TextQuestion,
  MultipleChoiceQuestion,
  Collection,
  // Alternative,
} from "@domain";

export interface IActivities {
  insert: (
    authorId: number,
    collectionId: number
  ) => Promise<{ activityId: number }>;
  update: (activity: Activity) => Promise<void>;
  findById: (activityId: number) => Promise<Activity | null>;
  findFullViewById: (activityId: number) => Promise<Activity | null>;
}

export interface IContents {
  insert: (content: Content) => Promise<{ contentId: number }>;
  update: (content: Content) => Promise<void>;
  delete: (contentId: number) => Promise<void>;
  findById: (contentId: number) => Promise<Content | null>;
  listByVersionId: (versionId: number) => Promise<Content[]>;
}

export interface IQuestions {
  insert: (
    args: Question
  ) => Promise<{ questionId: number; alternativesIds: number[] }>;
  update: (question: Question) => Promise<void>;
  findById: (questionId: number) => Promise<Question | null>;
  delete: (questionId: number) => Promise<void>;
}

export interface IVersions {
  insert: (version: ActivityVersion) => Promise<{ versionId: number }>;
  update: (version: ActivityVersion) => Promise<void>;
  delete: (versionId: number) => Promise<void>;
  findById: (
    versionId: number,
    activityId?: number
  ) => Promise<ActivityVersion | null>;
  findFullViewById: (
    versionId: number,
    activityId?: number
  ) => Promise<ActivityVersion | null>;
}

export interface IActivitiesRepository {
  Activities: IActivities;
  Contents: IContents;
  Versions: IVersions;
  Questions: IQuestions;
}

export interface IVersionsRead {
  listByCollectionOwnership: (
    userId: number,
    collectionId?: number
  ) => Promise<{ collection: Collection; version: ActivityVersion }[]>;
  listByCollectionParticipation: (
    userId: number,
    collectionId?: number
  ) => Promise<{ collection: Collection; version: ActivityVersion }[]>;
}

export interface IContentsRead {
  listByVersionId: (versionId: number) => Promise<Content[]>;
}

export interface IActivitiesReadRepository {
  Versions: IVersionsRead;
  Contents: IContentsRead;
}
