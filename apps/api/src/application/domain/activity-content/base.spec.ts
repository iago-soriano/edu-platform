import {
  Content,
  ContentTypes,
  ImageContent,
  VideoContent,
  TextContent,
} from "@domain";
import { DomainRules } from "@edu-platform/common";
import "../../../test/jest/matchers/custom-error";
import { expect } from "@jest/globals";
import {
  BaseContentDTODataBuilder,
  ImageContentDTODataBuilder,
  TextContentDTODataBuilder,
  VideoContentDTODataBuilder,
} from "@test";

describe("Unit tests for base Content domain entity", () => {
  it.todo("Should correctly instanciate the content type from DTO", () => {
    const imageDto = new ImageContentDTODataBuilder().build();
    const imageDomain = Content.mapFromDto(imageDto);
    expect(imageDomain).toBeInstanceOf(ImageContent);
  });

  describe("Should validate title", () => {
    const builder = new BaseContentDTODataBuilder();

    it("Should throw if title is too long", () => {
      const bigTitle = "t".repeat(DomainRules.CONTENT.TITLE.MAX_LENGTH + 1);
      const dto = builder.withTitle(bigTitle).build();
      const domain = Content.mapFromDto(dto);
      builder.reset();

      expect(() => domain.validateTitle()).toThrowFieldError(
        "title",
        `Título é longo demais. Tamanho máximo permitido é de ${DomainRules.CONTENT.TITLE.MAX_LENGTH} caracteres`
      );
    });

    it("Should throw if title is too short", () => {
      const smallTitle = "t".repeat(DomainRules.CONTENT.TITLE.MIN_LENGTH - 1);
      const dto = builder.withTitle(smallTitle).build();
      const domain = Content.mapFromDto(dto);
      builder.reset();

      expect(() => domain.validateTitle()).toThrowFieldError(
        "title",
        `Título é curto demais. Tamanho mínimo permitido é de ${DomainRules.CONTENT.TITLE.MIN_LENGTH} caracteres`
      );
    });

    it("Should not throw if title is right-sized", () => {
      const goodTitle = "t".repeat(
        (DomainRules.CONTENT.TITLE.MIN_LENGTH +
          DomainRules.CONTENT.TITLE.MAX_LENGTH) /
          2
      );
      const dto = builder.withTitle(goodTitle).build();
      const domain = Content.mapFromDto(dto);
      builder.reset();

      expect(() => domain.validateTitle()).not.toThrow();
    });
  });

  it.todo("Should validate description"); // just like the one above

  it.todo("Should correctly map all properties into domain entity", () => {
    const title = "fsdfsdfsdfds";
    const description = "fsdfsdfsdfds";
    const order = 67;

    const originatingVersionId = 88;
    const id = 99;
    const parentId = 103;

    const dto = new BaseContentDTODataBuilder()
      .withTitle(title)
      .withDescription(description)
      .withOrder(order)
      .withOriginatingVersionId(originatingVersionId)
      .withId(id)
      .withParentId(parentId)
      .build();

    const domain = Content.mapFromDto(dto);

    expect(domain.id).toBe(id);
  });

  it.todo("Should merge correctly", () => {});
});
