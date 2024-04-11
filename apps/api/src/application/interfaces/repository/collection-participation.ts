import {
  ListParticipantsOfCollectionResponseBody,
  PaginatedParamsDTO,
} from "@edu-platform/common";

export interface ICollectionParticipationsRepository {
  insertParticipant: (
    userId: number,
    collectionId: number,
    type: "Follower" | "Student"
  ) => Promise<void>;
  delete: (id: number) => Promise<void>;
  findByParticipantAndCollectionId: (
    studentId: number,
    collectionId: number
  ) => Promise<
    | {
        id: number;
        userId: number;
        collectionId: number;
        type: "Follower" | "Student";
        notifyOnActivityInsert: boolean;
      }
    | undefined
  >;
  findById: (id: number) => Promise<
    | {
        id: number;
        userId: number;
        collectionId: number;
        type: "Follower" | "Student";
        notifyOnActivityInsert: boolean;
      }
    | undefined
  >;
  findParticipantsToBeNotified: (
    collectionId: number
  ) => Promise<{ userId: number }[]>;
  updateNotificationsSettings: (
    userId: number,
    collectionId: number,
    notifyOnActivityInsert: boolean
  ) => Promise<void>;
}
