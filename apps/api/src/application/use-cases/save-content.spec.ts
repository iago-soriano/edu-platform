import Sut from "./save-content";
import {
  IActivitiesRepository,
  IStorageService,
  IIdGenerator,
} from "@interfaces";
import { ContentTypesType } from "@domain";
import { DomainRules } from "@edu-platform/common";

describe("Unit tests for Save Content Use Case", () => {
  let activitiesRepositoryMock;
  let storageServiceMock: IStorageService;
  let idServiceMock: IIdGenerator;

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
    };
    storageServiceMock = {
      uploadFile: jest.fn(),
      deleteFile: jest.fn(),
    };
    idServiceMock = {
      getId: jest.fn(),
    };
  });
  it("Should not create content if title is too long", async () => {
    const response = new Sut(
      activitiesRepositoryMock,
      storageServiceMock,
      idServiceMock
    ).execute({
      type: "Video",
      title:
        "Título muito enormeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      versionId: 1,
      activityId: 1,
      order: 0,
    });
    await expect(response).rejects.toThrow(
      `Título da atividade é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
    );
  });
  it("Should not create content if title is too short", async () => {
    const response = new Sut(
      activitiesRepositoryMock,
      storageServiceMock,
      idServiceMock
    ).execute({
      type: "Video",
      title: "Ai",
      versionId: 1,
      activityId: 1,
      order: 0,
    });
    await expect(response).rejects.toThrow(
      `Título da atividade é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`
    );
  });
  it("Should not create content if description is too long", async () => {
    const response = new Sut(
      activitiesRepositoryMock,
      storageServiceMock,
      idServiceMock
    ).execute({
      type: "Video",
      description:
        "descriçãoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      versionId: 1,
      activityId: 1,
      order: 0,
    });
    await expect(response).rejects.toThrow(
      `Descrição da atividade é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`
    );
  });
  it("Should not create content if description is too short", async () => {
    const response = new Sut(
      activitiesRepositoryMock,
      storageServiceMock,
      idServiceMock
    ).execute({
      type: "Video",
      description: "desc",
      versionId: 1,
      activityId: 1,
      order: 0,
    });
    await expect(response).rejects.toThrow(
      `Descrição da atividade é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH} caracteres`
    );
  });
  it("Should not create content if content type is invalid", async () => {
    // act
    const response = new Sut(
      activitiesRepositoryMock,
      storageServiceMock,
      idServiceMock
    ).execute({
      type: "fsdfsd" as ContentTypesType,
      versionId: 1,
      activityId: 1,
      order: 0,
    });

    // assert / verify
    await expect(response).rejects.toThrow("Tipo de conteúdo não encontrado");
  });
  it("Should create content if all validations pass", async () => {
    await new Sut(
      activitiesRepositoryMock,
      storageServiceMock,
      idServiceMock
    ).execute({
      type: "Text",
      title: "Título do content",
      description:
        "Testando se content será criado quando todas as validações passarem",
      versionId: 1,
      activityId: 1,
      order: 7,
    });

    expect(activitiesRepositoryMock.insertContent.mock.calls).toHaveLength(1);
    expect(
      activitiesRepositoryMock.insertContent.mock.calls[0][0]
    ).toStrictEqual({
      type: "Text",
      title: "Título do content",
      description:
        "Testando se content será criado quando todas as validações passarem",
      order: 7,
      originatingVersionId: 1,
      content: undefined,
    });
  });
});
