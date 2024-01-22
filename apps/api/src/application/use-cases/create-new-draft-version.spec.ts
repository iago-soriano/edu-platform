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

describe("Create New Draft Version Use Case unit tests", () => {
  it.todo(
    "Should throw an error if user id is different from activity author id"
  );
  it.todo("Should return the draftVersionId if the activity has one");
  it.todo(
    "Should create a new version with an incremented version number, and duplicate all elements to it"
  );
});
