import {
  ActivityRepositoryMockBuilder,
  GetActivityMiddlewareMockBuilder,
  IdGeneratorMockBuilder,
  BaseContentDTODataBuilder,
  S3ServiceMockBuilder,
  UserDTODataBuilder,
  VersionDTODataBuilder,
  ActivityDTODataBuilder,
  ValidateActivityUserRelationMiddlewareMockBuilder,
  SaveContentUseCaseMockBuilder,
} from "@test";
import { SaveContentUseCase } from "@use-cases";
import { jest, test } from "@jest/globals";
import {
  ActivityContentNotFound,
  ActivityIsNotFound,
  ActivityVersionNotFound,
  ActivityIsNotDraft,
} from "@edu-platform/common";
import { VersionStatus } from "@domain";

describe("Get Activity Version Use Case unit tests", () => {
  it.todo(
    "Should throw an error if user is not author and activity is a draft"
  );

  it.todo(
    "Should return contents and questions in an elements property, sorted by their order number"
  );
});
