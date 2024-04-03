import { z } from "zod";
type FileType = Express.Multer.File;

enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}

const videoPayloadSchema = z.object({
  tracks: z.string().optional(),
  url: z.string().optional(),
});
// export type VideoContentPayloadDTO = z.infer<typeof videoPayloadSchema>;

const textPayloadSchema = z.object({
  text: z.string().optional(),
});
type TextContentPayloadDTO = z.infer<typeof textPayloadSchema>;

const imagePayloadSchema = z.object({
  file: z.custom<FileType>().optional(),
  url: z.string().optional(),
});
type ImageContentPayloadDTO = z.infer<typeof imagePayloadSchema>;

const contentTypeSchema = z.nativeEnum(ContentTypes);
export const parseContentType = contentTypeSchema.parse;

const contentResponseSchema = z.object({
  id: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),

  title: z.string(),
  description: z.string(),
  type: z.nativeEnum(ContentTypes),
  payload: z.object({
    video: videoPayloadSchema.optional(),
    text: textPayloadSchema.optional(),
    image: imagePayloadSchema.optional(),
  }),
  order: z.number(),
  versionId: z.number(),
});

export type ContentResponseDTO = z.infer<typeof contentResponseSchema>;
