import { IActivitiesRepository } from "@interfaces";
import { AbstractMockBuilder } from "../abstract";

export class ActivityRepositoryMockBuilder extends AbstractMockBuilder<IActivitiesRepository> {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.object = {
      Activities: {
        insert: jest.fn(),
        update: jest.fn(),
        findById: jest.fn(),
      },
      VersionElements: {
        insert: jest.fn(),
        delete: jest.fn(),
      },
      Contents: {
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findById: jest.fn(),
      },
      Versions: {
        insert: jest.fn(),
        update: jest.fn(),
        findSimpleViewById: jest.fn(),
        findElementsByVersionId: jest.fn(),
        listByAuthorIdAndStatuses: jest.fn(),
      },
    };
  }
}
