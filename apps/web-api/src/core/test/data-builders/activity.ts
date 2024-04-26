import {
  IUseCase,
  IActivitiesRepository,
  ActivitySelectDTO,
  ActivityVersionSelectDTO,
  ActivityContentSelectDTO,
} from "@interfaces";

import { AbstractBuilder } from ".";

export class ActivityDTODataBuilder extends AbstractBuilder<ActivitySelectDTO> {
  constructor() {
    super();
  }
  reset() {
    this.data = {
      id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: 2,
      lastVersionId: "2",
      draftVersionId: "2",
    };
  }
}
