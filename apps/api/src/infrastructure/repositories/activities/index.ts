import { Activities as ActivitiesTable } from "./activity";
import { Versions as VersionsTable } from "./version";
import { Contents as ContentsTable } from "./content";
import { VersionElements as VersionElementsTable } from "./version-element";

import { IActivitiesRepository } from "@interfaces";

export class ActivityRepository implements IActivitiesRepository {
  Activities: ActivitiesTable;
  VersionElements: VersionElementsTable;
  Contents: ContentsTable;
  Versions: VersionsTable;

  constructor() {
    this.Activities = new ActivitiesTable();
    this.VersionElements = new VersionElementsTable();
    this.Contents = new ContentsTable();
    this.Versions = new VersionsTable();
  }
}
