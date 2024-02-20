import { Content, ContentTypes } from "./base";
import { DomainRules } from "@edu-platform/common";
import {
  ContentDoesNotImplementFiles,
  VideoContentHasToManyTracks,
} from "@edu-platform/common/errors/domain/content";

export class VideoContent extends Content {
  public tracks?: string = "";
  public url?: string = "";

  constructor() {
    super(ContentTypes.Video);
  }

  mergePayload(newContent: VideoContent) {
    if (newContent.tracks) this.tracks = newContent.tracks;
    if (newContent.url) this.url = newContent.url;
  }

  validatePayload() {
    if (!this.tracks) return;
    if (
      this.tracks.split(",").length > DomainRules.CONTENT.VIDEO.TRACKS_MAX_NUM
    )
      throw new VideoContentHasToManyTracks();
  }

  hasContent() {
    return !!this.url;
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
