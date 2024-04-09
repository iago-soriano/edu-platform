import { z } from "zod";
export type FileType = Express.Multer.File;

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

export const videoPayloadSchema = z.object({
  tracks: z.string().optional(),
  url: z.string().optional(),
});
export type VideoContentPayloadDTO = z.infer<typeof videoPayloadSchema>;

export const textPayloadSchema = z.object({
  text: z.string().optional(),
});
export type TextContentPayloadDTO = z.infer<typeof textPayloadSchema>;

export const imagePayloadSchema = z.object({
  file: z.custom<FileType>().optional(),
  url: z.string().optional(),
});
export type ImageContentPayloadDTO = z.infer<typeof imagePayloadSchema>;

const versionStatusSchema = z.nativeEnum(VersionStatus);
export const parseVersionStatus = versionStatusSchema.parse;
