import { Content, ContentTypes } from "./base";
import { DomainRules } from "@edu-platform/common";
import {
  ContentDoesNotImplementFiles,
  VideoContentHasToManyTracks,
} from "@edu-platform/common/errors/domain/content";
import { IgnorePersistance } from "../../../abstract";

export class VideoContent extends Content {
  @IgnorePersistance()
  public tracks: string = "";
  @IgnorePersistance()
  public url: string = "";

  constructor() {
    super(ContentTypes.Video);
  }

  _mergePayload(newContent: VideoContent) {
    if (newContent.tracks) this.tracks = newContent.tracks;
    if (newContent.url) this.url = newContent.url;
  }

  validatePayload() {
    if (!this.tracks) return;
    const tracksArray = this.tracks.split(",");
    if (tracksArray.length > 10)
      throw new Error("Video content has too many tracks");
    for (const track of tracksArray) {
      const intervals = track.split("-");
      const hasTwoIntervals = intervals.length === 2;
      const hasCorrectIntervals =
        intervals[0].split(":").length === 3 &&
        intervals[1].split(":").length === 3;
      if (!hasTwoIntervals || !hasCorrectIntervals)
        throw new Error("Tracks format must be hh:mm:ss-hh:mm:ss,...");
    }
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
