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
  const baseBuilder = new BaseContentDTODataBuilder();
  const imageBuilder = new ImageContentDTODataBuilder();
  const videoBuilder = new VideoContentDTODataBuilder();
  const textBuilder = new TextContentDTODataBuilder();

  beforeEach(() => {
    baseBuilder.reset();
    imageBuilder.reset();
    videoBuilder.reset();
    textBuilder.reset();
  });

  describe("Should validate title", () => {
    it("Should throw if title is too long", () => {
      const dto = baseBuilder.withLongTitle().build();
      const domain = Content.mapFromDto(dto);

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

  describe("Should validade description", () => {
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

  it("Should correctly map all properties from dto into domain entity", () => {
    const title = "fsdfsdfsdfds";
    const description = "fsdfsdfsdfds";
    const order = 67;

    const id = 99;

    const dto = baseBuilder
      .withTitle(title)
      .withDescription(description)
      .withOrder(order)
      .withId(id)
      .build();

    const domain = Content.mapFromDto(dto);

    expect(domain.id).toBe(id);
    expect(domain.title).toBe(title);
    expect(domain.description).toBe(description);
    expect(domain.order).toBe(order);
  });

  it("Should create correct content instance type from dto", () => {
    const imageDto = imageBuilder.build();
    const imageContent = Content.mapFromDto(imageDto);

    expect(imageContent).toBeInstanceOf(ImageContent);

    const videoDto = videoBuilder.build();
    const videoContent = Content.mapFromDto(videoDto);

    expect(videoContent).toBeInstanceOf(VideoContent);

    const textDto = textBuilder.build();
    const textContent = Content.mapFromDto(textDto);

    expect(textContent).toBeInstanceOf(TextContent);
  });

  it("Should merge correctly", () => {
    const existingDto = baseBuilder.build();
    const existingDomain = Content.mapFromDto(existingDto);

    const newDto = baseBuilder
      .withTitle(existingDto.title + "dfdsfdsfds")
      .withDescription(existingDto.description + "dfdsfdsfds")
      .withOrder(existingDto.order + 8)
      .build();

    const newDomain = Content.mapFromDto(newDto);

    existingDomain.merge(0, newDomain);

    expect(existingDomain.title).toBe(newDto.title);
    expect(existingDomain.description).toBe(newDto.description);
    expect(existingDomain.order).toBe(newDto.order);
  });

  it("Should correctly say content is half completed", () => {
    //defaults for title and description are non-empty
    const imageDto = imageBuilder.withPayload({ url: "" }).build();
    const textDto = textBuilder.withPayload({ text: "" }).build();
    const videoDto = videoBuilder.withPayload({ url: "", tracks: "" }).build();

    const dtos = [imageDto, textDto, videoDto];

    for (const dto of dtos) {
      const domain = Content.mapFromDto(dto);
      expect(domain.isHalfCompleted()).toBeTruthy();
      expect(domain.isEmpty()).toBeFalsy();
    }
  });

  it("Should correctly say content is empty", () => {
    const imageDto = imageBuilder
      .withTitle("")
      .withDescription("")
      .withPayload({ url: "" })
      .build();
    const textDto = textBuilder
      .withTitle("")
      .withDescription("")
      .withPayload({ text: "" })
      .build();
    const videoDto = videoBuilder
      .withTitle("")
      .withDescription("")
      .withPayload({ url: "", tracks: "" })
      .build();

    const dtos = [imageDto, textDto, videoDto];

    for (const dto of dtos) {
      const domain = Content.mapFromDto(dto);
      expect(domain.isHalfCompleted()).toBeFalsy();
      expect(domain.isEmpty()).toBeTruthy();
    }
  });
});
