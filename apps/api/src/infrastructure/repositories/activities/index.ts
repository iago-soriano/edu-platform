import { Activities as ActivitiesTable } from "./activity";
import { Versions as VersionsTable } from "./version";
import { Contents as ContentsTable } from "./content";

import { IActivitiesRepository } from "@interfaces";

export class ActivityRepository implements IActivitiesRepository {
  Activities: ActivitiesTable;
  Contents: ContentsTable;
  Versions: VersionsTable;

  constructor() {
    this.Activities = new ActivitiesTable();
    this.Contents = new ContentsTable();
    this.Versions = new VersionsTable();
  }
}
