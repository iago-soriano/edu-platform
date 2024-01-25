import {
  ActivityRepositoryMockBuilder,
  GetActivityMiddlewareMockBuilder,
  IdGeneratorMockBuilder,
  BaseContentDTODataBuilder,
  S3ServiceMockBuilder,
  UserDTODataBuilder,
  VersionDTODataBuilder,
  ActivityDTODataBuilder,
  SaveContentUseCaseMockBuilder,
} from "@test";
import { SaveContentUseCase } from "@use-cases";
import { jest, test } from "@jest/globals";
import { ActivityVersionIsNotDraft } from "@edu-platform/common";
import { VersionStatus } from "@domain";

describe("Save Content Use Case unit tests", () => {
  const contentDtoDataBuilder = new BaseContentDTODataBuilder();
  const userDtoDataBuilder = new UserDTODataBuilder();
  const versionDtoDataBuilder = new VersionDTODataBuilder();
  const activityDtoDataBuilder = new ActivityDTODataBuilder();

  const sutBuilder = new SaveContentUseCaseMockBuilder();

  const activityId = 3;
  const versionId = 4;

  beforeEach(() => {
    contentDtoDataBuilder.reset();
    userDtoDataBuilder.reset();
    versionDtoDataBuilder.reset();
    activityDtoDataBuilder.reset();

    sutBuilder.reset();

    jest.resetAllMocks();
  });

  it("Should throw if activity is not a draft", async () => {
    const versionDto = versionDtoDataBuilder
      .withStatus(VersionStatus.Published)
      .build();
    const activityDto = activityDtoDataBuilder.build();
    const contentDto = contentDtoDataBuilder.build();
    const user = userDtoDataBuilder.build();

    sutBuilder.getActivityMiddlewareMockBuilder.withReturn(
      versionDto,
      activityDto
    );
    sutBuilder.refresh();

    const sut = sutBuilder.object;

    await expect(
      sut.execute({ contentDto, activityId, versionId, user })
    ).rejects.toThrow(ActivityVersionIsNotDraft.message);
  });

  describe("File upload validations", () => {
    it.todo("Should not try to upload files if content type does not allow");
    it.todo(
      "Should not try to upload files if file-based content dto has no files"
    );
    it.todo("Should try to upload files if file-based content dto has files");
  });

  it.todo("Should insert new content if dto has no id");
  it.todo("Should throw if informed content id does not exist");
});
