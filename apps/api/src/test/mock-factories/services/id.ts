import { AbstractMockBuilder } from "../abstract";
import { IIdGenerator } from "@interfaces";

export class IdGeneratorMockBuilder extends AbstractMockBuilder<IIdGenerator> {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.withReturn("fdsfdshsuagfdgfaga");
  }

  withReturn(id: string) {
    this.object = {
      getId: jest.fn(() => id),
    };
    return this;
  }
}
