import { z } from "zod";
export type FileType = Express.Multer.File;

export enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}

const videoPayloadSchema = z.object({
  tracks: z.string().optional(),
  url: z.string().optional(),
});
export type VideoContentPayloadDTO = z.infer<typeof videoPayloadSchema>;

const textPayloadSchema = z.object({
  text: z.string().optional(),
});
export type TextContentPayloadDTO = z.infer<typeof textPayloadSchema>;

const imagePayloadSchema = z.object({
  file: z.custom<FileType>().optional(),
  url: z.string().optional(),
});
export type ImageContentPayloadDTO = z.infer<typeof imagePayloadSchema>;

const contentRequestSchema = z.object({
  id: z.any().optional(),

  title: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(ContentTypes),
  payload: z
    .object({
      video: videoPayloadSchema.optional(),
      text: textPayloadSchema.optional(),
      image: imagePayloadSchema.optional(),
    })
    .optional(),
});

export const parseToContentRequestDTO = contentRequestSchema.parse;
export type ContentRequestDTO = z.infer<typeof contentRequestSchema>;

type RequestBody = ContentRequestDTO;
type ResponseBody = {
  contentId?: number;
};
type Params = { activityId: string };

export {
  RequestBody as SaveContentRequestBody,
  ResponseBody as SaveContentResponseBody,
  Params as SaveContentParams,
};
