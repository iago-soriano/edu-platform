import { Content, Activity, BaseElement, ActivityVersion } from "@domain";
import {
  GetActivityVersionResponseBody,
  ListActivityVersionsResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";
import { db } from "@infrastructure";

export interface IElements {
  insert: (tx: typeof db, content: BaseElement) => Promise<void>;
  update: (tx: typeof db, element: BaseElement) => Promise<void>;
  delete: (tx: typeof db, element: BaseElement) => Promise<void>;
}

// export interface IQuestions {
//   insert: (
//     tx: typeof db,
//     args: Question
//   ) => Promise<{ questionId: number; alternativesIds: number[] }>;
//   update: (tx: typeof db, question: Question) => Promise<void>;
//   delete: (tx: typeof db, questionId: number) => Promise<void>;
// }

export interface IVersions {
  insert: (
    tx: typeof db,
    version: ActivityVersion
  ) => Promise<{ versionId: string }>;
  update: (tx: typeof db, version: ActivityVersion) => Promise<void>;
  delete: (tx: typeof db, versionId: string) => Promise<void>;
}

export interface IActivitiesRepository {
  // insert: (activity: Activity) => Promise<{ activityId: string }>;
  save: (activity: Activity) => Promise<any>;
  findRootById: (activityId: string) => Promise<Activity | null>;
  findRootByIdWithContents: (activityId: string) => Promise<Activity | null>;
  // Elements: IElements;
  // Versions: IVersions;
}

export interface IActivitiesReadRepository {
  listByCollectionOwnership: (
    args: {
      userId: number;
      collectionId?: number;
    } & PaginatedParamsDTO
  ) => Promise<ListActivityVersionsResponseBody>;
  // listByCollectionParticipation: (
  //   userId: number,
  //   collectionId?: number
  // ) => Promise<{ collection: Collection; version: ActivityVersion }[]>;
  findFullViewById: (
    activityId: string
  ) => Promise<GetActivityVersionResponseBody | null>;
}
