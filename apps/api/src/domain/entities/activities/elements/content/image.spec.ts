import {
  Content,
  ContentTypes,
  ImageContent,
  VideoContent,
  TextContent,
} from "@domain";
import { DomainRules } from "@edu-platform/common";
import "../../../../../../test/jest/matchers/custom-error";
import { expect } from "@jest/globals";
import {
  BaseContentDTODataBuilder,
  ImageContentDTODataBuilder,
  TextContentDTODataBuilder,
  VideoContentDTODataBuilder,
} from "@test";

describe("Unit tests for Image Content domain entity", () => {
  const imageDataBuilder = new ImageContentDTODataBuilder();

  beforeEach(() => {
    imageDataBuilder.reset();
  });

  it("Should correctly map payload from dto to domain entity", () => {
    const imageDto = imageDataBuilder.build();

    const imageDomain = Content.mapFromDto(imageDto) as ImageContent;

    expect(imageDomain.url).toBe(imageDto.payload.image?.url);
    expect(imageDomain.file).toBe(imageDto.payload.image?.file);
  });

  it("Should correctly say it has or has no content", () => {
    const dto1 = imageDataBuilder.withPayload({ url: "" }).build();
    const domain1 = Content.mapFromDto(dto1);

    expect(domain1.hasContent()).toBeFalsy();

    const dto2 = imageDataBuilder.withPayload({ url: "fdsfsdfsdfsd" }).build();
    const domain2 = Content.mapFromDto(dto2);

    expect(domain2.hasContent()).toBeTruthy();
  });
});
