import { z } from "zod";

export const collectionSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ownerId: z.number().optional(),
  isPrivate: z.boolean().optional(),
  notifyOwnerOnStudentOutput: z.boolean().optional(),
});

export type CollectionDTO = z.infer<typeof collectionSchema>;
export const parseToCollectionDTO = collectionSchema.parse;
