import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
} from "@interfaces";
import { AbstractBuilder } from ".";
import { VersionStatus } from "@domain";

export class VersionDTODataBuilder extends AbstractBuilder<ActivityVersionSelectDTO> {
  constructor() {
    super();
  }
  reset() {
    this.data = {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "xfasdfsagsg",
      description: "sadfwftgqdfasdf",
      topics: "fasdfwaf,fsdffrfadfds,fdsfafe,fsdfdsafsa",
      status: "Draft",
      activityId: 5,
      version: 4,
    };
  }

  withStatus(status: VersionStatus) {
    this.data.status = status;
    return this;
  }
}
