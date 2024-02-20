import { Collection, User } from "@domain";
import { UserSelectDTO } from "./dtos";

export interface ICollectionParticipationsRepository {
  insertStudent: (studentId: number, collectionId: number) => Promise<void>;
  removeStudent: (studentId: number, collectionId: number) => Promise<void>;
  findStudentCollectionRelation: (
    studentId: number,
    collectionId: number
  ) => Promise<{ studentId: number; collectionId: number } | undefined>;
  findParticipatingStudents: (collectionId: number) => Promise<User[]>;
}
