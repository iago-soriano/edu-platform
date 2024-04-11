import { AbstractMockBuilder } from "../abstract";

export class IdGeneratorMockBuilder extends AbstractMockBuilder<{}> {
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
