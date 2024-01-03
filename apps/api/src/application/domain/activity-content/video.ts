import { ContentTypesType } from "@domain";
import { Content } from "./base";
import { FileType } from "@interfaces";

export class VideoContent extends Content {
  constructor(
    public type: ContentTypesType,
    public id: number,
    public title: string,
    public description: string,
    public tracks: string,
    public videoUrl: string,
    public order: number,
    public originatingVersionId: number,
    public parentId: number
  ) {
    super(type, id, title, description, order, originatingVersionId, parentId);
  }

  merge(
    versionId: number,
    content: Partial<Content> & { tracks?: string; videoUrl?: string }
  ) {
    if (this.originatingVersionId !== versionId) {
      this.id = undefined;
      this.title = content.title;
      this.description = content.description;
      this.tracks = content.tracks;
      this.videoUrl = content.videoUrl;
      this.parentId = content.id;
      this.originatingVersionId = versionId;
    } else {
      this.title = content.title;
      this.description = content.description;
      this.tracks = content.tracks;
      this.videoUrl = content.videoUrl;
    }
  }
}
