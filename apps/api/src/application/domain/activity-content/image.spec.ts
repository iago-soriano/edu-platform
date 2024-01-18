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

describe("Unit tests for Image Content domain entity", () => {
  it("Should correctly map payload from dto to domain entity", () => {
    const urlFromDto = "fdsggrg4ctgwhg";
    const imageDto = new ImageContentDTODataBuilder()
      .withPayload({ url: urlFromDto })
      .build();
    const imageDomain = Content.mapFromDto(imageDto) as ImageContent;

    expect(imageDomain.url).toBe(urlFromDto);
  });

  it("Should correctly say it's empty", () => {
    const imageDto = new ImageContentDTODataBuilder()
      .withTitle("")
      .withDescription("")
      .withPayload({ url: "" })
      .build();
    const domain = Content.mapFromDto(imageDto);

    expect(domain.isEmpty()).toBeTruthy();
  });

  it("Should correctly say it's half-completed", () => {
    const builder = new ImageContentDTODataBuilder().withPayload({ url: "" });

    // because of description
    let imageDto = builder
      .withTitle("")
      .withDescription("asdasdasdsdasdaa")
      .build();

    expect(Content.mapFromDto(imageDto).isHalfCompleted()).toBeTruthy();
    builder.reset();

    // because of title
    imageDto = builder
      .withTitle("asdasdasdsdasdaa")
      .withDescription("")
      .build();

    expect(Content.mapFromDto(imageDto).isHalfCompleted()).toBeTruthy();
  });
});
