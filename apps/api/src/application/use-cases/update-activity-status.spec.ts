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

describe("Delete Version Use Case unit tests", () => {
  it.todo("Should throw an error if activity is not a draft");

  it.todo("Should call delete with all content ids");

  it.todo("Should update activity to have no draftVersionId");
});
