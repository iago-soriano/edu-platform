import { z } from "zod";
import { ContentTypes } from "../../common";
export type FileType = Express.Multer.File;

const saveContentParamsSchema = z.object({
  activityId: z.string().uuid(),
});

type Params = z.infer<typeof saveContentParamsSchema>;

const saveContentRequestSchema = z.object({
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

type RequestBody = z.infer<typeof saveContentRequestSchema>;

interface ResponseBody {
  contentId?: number;
}

export type {
  Params as SaveContentParams,
  RequestBody as SaveContentRequestBody,
  ResponseBody as SaveContentResponseBody,
};

export { saveContentParamsSchema, saveContentRequestSchema };
