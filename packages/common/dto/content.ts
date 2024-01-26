import { z } from "zod";
// import { FileType } from "@interfaces";

export enum ContentTypes {
  Video = "Video",
  Text = "Text",
  Image = "Image",
}

const contentTypeSchema = z.nativeEnum(ContentTypes);
export const parseContentType = contentTypeSchema.parse;

const contentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.nativeEnum(ContentTypes),
  id: z.number().optional(),
  payload: z.object({
    video: z
      .object({
        tracks: z.string().optional(),
        url: z.string().optional(),
      })
      .optional(),
    text: z
      .object({
        text: z.string().optional(),
      })
      .optional(),
    image: z
      .object({
        // file: z.custom<FileType>().optional(),
        url: z.string().optional(),
      })
      .optional(),
  }),
  order: z.number(),
  versionId: z.number(),
});

export const parseToContentDTO = contentSchema.parse;
export type ContentDTO = z.infer<typeof contentSchema>;
