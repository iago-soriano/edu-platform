import {
  Content,
  ContentTypes,
  ImageContent,
  VideoContent,
  TextContent,
} from "@domain";
import { DomainRules, TextContentIsTooLong } from "@edu-platform/common";
import "../../../test/jest/matchers/custom-error";
import { expect } from "@jest/globals";
import {
  BaseContentDTODataBuilder,
  ImageContentDTODataBuilder,
  TextContentDTODataBuilder,
  VideoContentDTODataBuilder,
} from "@test";

describe("Unit tests for Text Content domain entity", () => {
  const textDataBuilder = new TextContentDTODataBuilder();

  beforeEach(() => {
    textDataBuilder.reset();
  });

  it("Should correctly map payload from dto to domain entity", () => {
    const textDto = textDataBuilder.build();

    const textDomain = Content.mapFromDto(textDto) as TextContent;

    expect(textDomain.text).toBe(textDto.payload.text?.text);
  });

  it("Should correctly say it has content or not", () => {
    const dto1 = textDataBuilder.withPayload({ text: "" }).build();
    const domain1 = Content.mapFromDto(dto1);

    expect(domain1.hasContent()).toBeFalsy();

    const dto2 = textDataBuilder.withPayload({ text: "fdsfsdfsdfsd" }).build();
    const domain2 = Content.mapFromDto(dto2);

    expect(domain2.hasContent()).toBeTruthy();
  });

  describe("Should validate text payload", () => {
    it("Should throw if text is too long", () => {
      const dto = textDataBuilder.withLongText().build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validatePayload()).toThrow();
    });

    it("Should throw if text is too short", () => {
      const dto = textDataBuilder.withShortText().build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validatePayload()).toThrow();
    });

    it("Should not throw if text is right-sized", () => {
      const dto = textDataBuilder.build();
      const domain = Content.mapFromDto(dto);

      expect(() => domain.validatePayload()).not.toThrow();
    });
  });
});
