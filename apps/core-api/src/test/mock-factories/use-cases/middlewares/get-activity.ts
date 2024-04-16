import { AbstractMockBuilder } from "../../abstract";
import {
  VersionDTODataBuilder,
  ActivityDTODataBuilder,
} from "../../../data-builders";
import { IGetActivityUseCaseHelper } from "@use-case-middlewares";
import { jest } from "@jest/globals";
import { ActivitySelectDTO, ActivityVersionSelectDTO } from "@interfaces";

export class GetActivityMiddlewareMockBuilder extends AbstractMockBuilder<IGetActivityUseCaseHelper> {
  private versionDtoDataBuilder!: VersionDTODataBuilder;
  private activityDTODataBuilder!: ActivityDTODataBuilder;

  constructor() {
    super();
    this.versionDtoDataBuilder = new VersionDTODataBuilder();
    this.activityDTODataBuilder = new ActivityDTODataBuilder();
    this.reset();
  }

  reset(): void {
    const version = this.versionDtoDataBuilder.build();
    const activity = this.activityDTODataBuilder.build();

    this.withReturn(version, activity);
  }

  withReturn(version: ActivityVersionSelectDTO, activity: ActivitySelectDTO) {
    this.object = {
      execute: jest
        .fn<
          () => Promise<{
            activity: ActivitySelectDTO;
            version: ActivityVersionSelectDTO;
          }>
        >()
        .mockResolvedValue({
          activity,
          version,
        }),
    };
    return this;
  }
}
