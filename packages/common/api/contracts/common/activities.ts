import { z } from "zod";

enum VersionStatus {
  Published = "Published",
  Draft = "Draft",
  Archived = "Archived",
}
export enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}
export enum QuestionTypes {
  MultipleChoice = "MultipleChoice",
  Text = "Text",
}

const versionStatusSchema = z.nativeEnum(VersionStatus);
export const parseVersionStatus = versionStatusSchema.parse;
