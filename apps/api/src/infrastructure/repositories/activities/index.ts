import { Activities as ActivitiesTable } from "./activity";
import { Versions as VersionsTable } from "./version";
import { Contents as ContentsTable } from "./content";
import { Questions as QuestionsTable } from "./question";

import { IActivitiesRepository, IQuestions } from "@interfaces";

export class ActivityRepository implements IActivitiesRepository {
  Activities: ActivitiesTable;
  Contents: ContentsTable;
  Versions: VersionsTable;
  Questions: IQuestions;

  constructor() {
    this.Activities = new ActivitiesTable();
    this.Contents = new ContentsTable();
    this.Versions = new VersionsTable();
    this.Questions = new QuestionsTable();
  }
}
