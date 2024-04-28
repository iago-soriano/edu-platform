import { z } from "zod";
import { ContentTypes } from "../../common";
export type FileType = Express.Multer.File;

const contentRequestSchema = z.object({
  id: z.coerce.number().optional(),

  description: z.string().optional(),
  type: z.nativeEnum(ContentTypes),
  payload: z
    .object({
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
          file: z.custom<FileType>().optional(),
        })
        .optional(),
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
  Params as SaveContentParams,
  RequestBody as SaveContentRequestBody,
  ResponseBody as SaveContentResponseBody,
};
