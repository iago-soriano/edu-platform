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

describe("Delete Content Use Case unit tests", () => {
  it.todo(
    "Should do nothing if informed content id is not returned from use-case helper"
  );

  it.todo(
    "Should throw an error if user id is different from activity author id"
  );
  it.todo("Should delete content");
});
