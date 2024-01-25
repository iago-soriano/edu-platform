import { Content, VideoContent } from "@domain";
import "../../../test/jest/matchers/custom-error";
import { expect } from "@jest/globals";
import { VideoContentDTODataBuilder } from "@test";

describe("Unit tests for Video Content domain entity", () => {
  const videoDataBuilder = new VideoContentDTODataBuilder();

  beforeEach(() => {
    videoDataBuilder.reset();
  });

  it("Should correctly map payload from dto to domain entity", () => {
    const videoDto = videoDataBuilder.build();

    const videoDomain = Content.mapFromDto(videoDto) as VideoContent;

    expect(videoDomain.url).toBe(videoDto.payload.video?.url);
    expect(videoDomain.tracks).toBe(videoDto.payload.video?.tracks);
  });

  it("Should correctly say it has content or not", () => {
    const dto1 = videoDataBuilder.withPayload({ url: "", tracks: "" }).build();
    const domain1 = Content.mapFromDto(dto1);

    expect(domain1.hasContent()).toBeFalsy();

    const dto2 = videoDataBuilder
      .withPayload({ url: "fdsfsdfsdfsd", tracks: "" })
      .build();
    const domain2 = Content.mapFromDto(dto2);

    expect(domain2.hasContent()).toBeTruthy();

    const dto3 = videoDataBuilder
      .withPayload({ url: "", tracks: "00:00:00-00:00:00" })
      .build();
    const domain3 = Content.mapFromDto(dto3);

    expect(domain3.hasContent()).toBeTruthy();

    const dto4 = videoDataBuilder
      .withPayload({ url: "fdsfsdfsdfsd", tracks: "00:00:00-00:00:00" })
      .build();
    const domain4 = Content.mapFromDto(dto4);

    expect(domain4.hasContent()).toBeTruthy();
  });

  it("Should throw if video payload has too many tracks", () => {
    const dto = videoDataBuilder.withTooManyTracks().build();
    const domain = Content.mapFromDto(dto);

    expect(domain.validatePayload()).toThrow();
  });
});
