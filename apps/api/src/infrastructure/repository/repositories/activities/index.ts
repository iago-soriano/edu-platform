import { Activities as ActivitiesTable } from "./activity";
import { Versions as VersionsTable, VersionsRead } from "./version";
import { Contents as ContentsTable, ContentsRead } from "./content";
import { Questions as QuestionsTable } from "./question";

import {
  IActivitiesRepository,
  IQuestions,
  IActivities,
  IContents,
  IVersions,
  IActivitiesReadRepository,
  IVersionsRead,
  IContentsRead,
} from "@interfaces";

export class ActivityRepository implements IActivitiesRepository {
  Activities: IActivities;
  Contents: IContents;
  Versions: IVersions;
  Questions: IQuestions;

  constructor() {
    this.Activities = new ActivitiesTable();
    this.Contents = new ContentsTable();
    this.Versions = new VersionsTable();
    this.Questions = new QuestionsTable();
  }
}

export class ActivityReadRepository implements IActivitiesReadRepository {
  Contents: IContentsRead;
  Versions: IVersionsRead;

  constructor() {
    this.Contents = new ContentsRead();
    this.Versions = new VersionsRead();
  }
}
