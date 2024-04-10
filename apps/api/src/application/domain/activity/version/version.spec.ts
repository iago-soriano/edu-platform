import {
  Content,
  ContentTypes,
  ImageContent,
  VideoContent,
  TextContent,
  ActivityVersion,
} from "@domain";
import { DomainRules } from "@edu-platform/common";
import "../../../test/jest/matchers/custom-error";
import { expect } from "@jest/globals";
import {
  BaseContentDTODataBuilder,
  ImageContentDTODataBuilder,
  TextContentDTODataBuilder,
  VersionDTODataBuilder,
  VideoContentDTODataBuilder,
} from "@test";

describe("Unit tests for version domain entity", () => {
  const versionBuilder = new VersionDTODataBuilder();

  beforeEach(() => {
    versionBuilder.reset();
  });

  describe("Should validate title", () => {
    it("Should throw if title is too long", () => {
      const dto = versionBuilder.withLongTitle().build();
      const domain = ActivityVersion.mapFromDatabaseDto(dto);

      expect(() => domain.validateTitle()).toThrowFieldError(
        "title",
        `Título é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    });

    it("Should throw if title is too short", () => {
      const dto = versionBuilder.withLongTitle().build();
      const domain = new ActivityVersion(
        dto.id,
        dto.title,
        dto.description,
        dto.topics,
        dto.version,
        dto.status,
        dto.activityId
      );

      expect(() => domain.validateTitle()).toThrowFieldError(
        "title",
        `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`
      );
    });

    it("Should not throw if title is right-sized", () => {
      const dto = baseBuilder.build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validateTitle()).not.toThrow();
    });
  });
  describe("Should validate description", () => {
    it("Should throw if title is too long", () => {
      const dto = versionBuilder.withLongTitle().build();

      expect(() => domain.validateTitle()).toThrowFieldError(
        "title",
        `Título é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    });

    it("Should throw if title is too short", () => {
      const dto = baseBuilder.withShortTitle().build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validateTitle()).toThrowFieldError(
        "title",
        `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`
      );
    });

    it("Should not throw if title is right-sized", () => {
      const dto = baseBuilder.build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validateTitle()).not.toThrow();
    });
  });

  describe("Should validade topics", () => {
    it("Should throw if description is too long", () => {
      const dto = baseBuilder.withLongDescription().build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validateDescription()).toThrowFieldError(
        "description",
        `Descrição é longa demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MAX_LENGTH} caracteres`
      );
    });

    it("Should throw if description is too short", () => {
      const dto = baseBuilder.withShortDescription().build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validateDescription()).toThrowFieldError(
        "description",
        `Descrição é curta demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.DESCRIPTION.MIN_LENGTH} caracteres`
      );
    });

    it("Should not throw if description is right-sized", () => {
      const dto = baseBuilder.build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validateDescription()).not.toThrow();
    });
  });
});
