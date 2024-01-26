import { Content, ContentTypes } from "./base";
import { DomainRules } from "@edu-platform/common";
import {
  ContentDoesNotImplementFiles,
  VideoContentHasToManyTracks,
} from "@edu-platform/common/errors/domain/content";

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
      throw new VideoContentHasToManyTracks();
  }

  hasContent() {
    return !!this.tracks || !!this.url;
  }

  setFileUrl(_: string) {
    throw new ContentDoesNotImplementFiles(this.type);
  }

  shouldUploadFile(): boolean {
    return false;
  }

  storedFileUrl() {
    return null;
  }
}
