import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
} from "@interfaces";
import { AbstractBuilder } from ".";
import { VersionStatus } from "@domain";
import { DomainRules } from "@edu-platform/common";

export class VersionDTODataBuilder extends AbstractBuilder<ActivityVersionSelectDTO> {
  constructor() {
    super();
  }
  reset() {
    this.data = {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: "t".repeat(
        (DomainRules.ACTIVITY.TITLE.MIN_LENGTH +
          DomainRules.ACTIVITY.TITLE.MAX_LENGTH) /
          2
      ),
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

  withTitle(title: string) {
    this.data.title = title;
    return this;
  }

  withLongTitle() {
    this.data.title = "t".repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH + 1);
    return this;
  }

  withShortTitle() {
    this.data.title = "t".repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH - 1);
    return this;
  }
}
