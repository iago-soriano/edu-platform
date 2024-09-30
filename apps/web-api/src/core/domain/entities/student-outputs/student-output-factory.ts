import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common";
import { Activity } from "../activities";
import { User } from "../users";
import { OutputStatus, StudentOutput } from "./student-output";
import { Collection } from "../collections";

export class StudentOutputFactory {
  static from(
    activity: Activity,
    user: User,
    collection: Collection,
    existingStudentOutput: StudentOutput | null
  ) {
    if (!activity.lastVersion)
      throw new SilentInvalidStateError("Activity has no published version");

    if (!collection.isPrivate)
      throw new SilentInvalidStateError("Public collection");

    if (existingStudentOutput)
      throw new InvalidStateError(
        "An output for this activity version already exists"
      );

    const studentOutput = new StudentOutput();

    studentOutput.studentId = user.id;
    studentOutput.activityId = activity.id;
    studentOutput.outputStatus = OutputStatus.Draft;
    studentOutput.feedbackStatus = OutputStatus.Draft;
    studentOutput.activityAuthorId = activity.authorId;
    studentOutput.versionNumber = activity.lastVersion.version;

    return studentOutput;
  }
}
