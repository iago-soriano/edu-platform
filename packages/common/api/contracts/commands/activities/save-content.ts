import { z } from "zod";
import {
  ContentTypes,
  videoPayloadSchema,
  textPayloadSchema,
  imagePayloadSchema,
} from "../../common";

const contentRequestSchema = z.object({
  id: z.number().optional(),

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
