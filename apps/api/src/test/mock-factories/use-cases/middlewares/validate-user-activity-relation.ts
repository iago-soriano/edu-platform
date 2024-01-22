import { AbstractMockBuilder } from "../../abstract";
import { IValidateActivityUserRelationUseCaseMiddleware } from "@use-case-middlewares";

export class ValidateActivityUserRelationMiddlewareMockBuilder extends AbstractMockBuilder<IValidateActivityUserRelationUseCaseMiddleware> {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.object = {
      execute: jest.fn(),
    };
  }
}
