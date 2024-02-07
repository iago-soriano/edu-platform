import { z } from "zod";
// import { FileType } from "@interfaces";
export type FileType = Express.Multer.File;

export enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}

const videoPayloadSchema = z
  .object({
    tracks: z.string().optional(),
    url: z.string().optional(),
  })
  .optional();
export type VideoContentPayloadDTO = z.infer<typeof videoPayloadSchema>;

const textPayloadSchema = z
  .object({
    text: z.string().optional(),
  })
  .optional();
export type TextContentPayloadDTO = z.infer<typeof textPayloadSchema>;

const imagePayloadSchema = z
  .object({
    file: z.custom<FileType>().optional(),
    url: z.string().optional(),
  })
  .optional();
export type ImageContentPayloadDTO = z.infer<typeof imagePayloadSchema>;

const contentTypeSchema = z.nativeEnum(ContentTypes);
export const parseContentType = contentTypeSchema.parse;

const contentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(ContentTypes).optional(),
  id: z.number().optional(),
  payload: z
    .object({
      video: videoPayloadSchema,
      text: textPayloadSchema,
      image: imagePayloadSchema,
    })
    .optional(),
  order: z.number().optional(),
  versionId: z.number().optional(),
});

export const parseToContentDTO = contentSchema.parse;
export type ContentDTO = z.infer<typeof contentSchema>;
