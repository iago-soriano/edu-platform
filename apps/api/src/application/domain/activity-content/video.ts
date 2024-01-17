import { ContentDTO } from "@dto";
import { Content, ContentTypes } from "./base";
import { DomainRules } from "@edu-platform/common";

export class VideoContent extends Content {
  public tracks: string = "";
  public url: string = "";

  constructor() {
    super(ContentTypes.Video);
  }

  mergePayload(newContent: VideoContent) {
    this.tracks = newContent.tracks;
    this.url = newContent.url;
  }

  validatePayload() {
    if (
      this.tracks.split(",").length > DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM
    )
      throw new Error("Too many tracks");
  }

  hasContent() {
    return !!this.tracks || !!this.url;
  }

  setFileUrl(_: string) {
    throw new Error(`${this.type} type does not implement files`);
  }

  storedFileUrl() {
    return null;
  }

  mapPayloadFromDto(dto: ContentDTO) {
    this.tracks = dto.payload.video?.tracks || "";
    this.url = dto.payload.video?.url || "";
  }

  mapToDatabaseDto() {
    return {
      ...super.mapToDatabaseDto(),
      tracks: this.tracks,
      videoUrl: this.url,
    };
  }
}
