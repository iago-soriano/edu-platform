import { Activities as ActivitiesTable } from "./activity";
import { Versions as VersionsTable } from "./version";
import { Contents as ContentsTable } from "./content";
import { VersionElements as VersionElementsTable } from "./version-element";

import { IActivitiesRepository } from "@interfaces";

export class ActivityRepository implements IActivitiesRepository {
  Activities = new ActivitiesTable();
  VersionElements = new VersionElementsTable();
  Contents = new ContentsTable();
  Versions = new VersionsTable();
}
