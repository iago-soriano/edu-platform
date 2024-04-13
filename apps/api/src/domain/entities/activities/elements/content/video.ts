import { Content, ContentTypes } from "./base";
import { IgnorePersistance } from "../../../../abstract";
import { InvalidStateError, ContentRequestDTO } from "@edu-platform/common";

export class VideoContent extends Content {
  @IgnorePersistance()
  public tracks: string = "";
  @IgnorePersistance()
  public url: string = "";

  constructor() {
    super(ContentTypes.Video);
  }

  public hasContent() {
    return !!this.url;
  }

  protected _mergePayload(newValues: ContentRequestDTO) {
    const payload = newValues.payload?.video;
    if (!payload) return;

    if (payload.tracks !== undefined) {
      this.tracks = payload.tracks;
    }
    if (payload.url !== undefined) {
      this.url = payload.url;
    }
  }

  private _validateTracks() {
    if (this.tracks === "-") return;
    const tracksArray = this.tracks.split(",");
    if (tracksArray.length > 6)
      throw new InvalidStateError("Video can only have up to 6 tracks", {
        fieldName: "tracks",
      });
    for (const track of tracksArray) {
      const intervals = track.split("-");
      const hasTwoIntervals = intervals.length === 2;
      const hasCorrectIntervals =
        intervals[0].split(":").length === 3 &&
        intervals[1].split(":").length === 3;
      if (!hasTwoIntervals || !hasCorrectIntervals)
        throw new InvalidStateError(
          "Tracks format must be hh:mm:ss-hh:mm:ss,..."
        );
    }
  }
  private _validateVideoUrl() {
    return true; //TODO
  }
  protected _validatePayload() {
    this._validateTracks();
    this._validateVideoUrl();
  }
}
