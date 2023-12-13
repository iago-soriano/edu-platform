import { IActivitiesRepository, UserSelectDTO } from "@interfaces";
import Sut from "./create-new-activity";

describe("Unit tests for Create New Activity Use Case", () => {
  let activitiesRepositoryMock: IActivitiesRepository;
  let userDTOMock: UserSelectDTO;

  beforeAll(() => {
    activitiesRepositoryMock = {
      insertContent: jest.fn(),
      insertActivityAndNewVersion: jest.fn(),
      getActivityById: jest.fn(),
      updateActivityVersionMetadata: jest.fn(),
      updateContent: jest.fn(),
      getVersionById: jest.fn(),
      getActivityContentByContentId: jest.fn(),
      getActivityVersionsByAuthorIdAndStatuses: jest.fn(),
      createRelationBetweenVersionAndElement: jest.fn(),
    };

    userDTOMock = {
      id: 19,
      name: "patricia",
        email: 
    };
  });

  it("Should not create activity if title is too long", () => {
    const response = new Sut(activitiesRepositoryMock).execute({userDTOMock});
  });
  it("Should not create activity if title is too short", () => {});
  it("Should not create activity if description is too long", () => {});
  it("Should not create activity if description is too short", () => {});
  it("Should not create activity if status is invalid", () => {});
  it("Should create activity if all validations pass", () => {});
});
