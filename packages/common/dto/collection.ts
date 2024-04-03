import { z } from "zod";

export const collectionResponseSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string(),
  description: z.string(),
  isPrivate: z.boolean(),
  notifyOwnerOnStudentOutput: z.boolean(),

  ownerId: z.number(),
});

// export type CollectionResponseDTO = z.infer<typeof collectionResponseSchema>;

// export const collectionRequestSchema = z.object({
//   id: z.number().optional(),

//   name: z.string().optional(),
//   description: z.string().optional(),
//   isPrivate: z.boolean().optional(),
//   notifyOwnerOnStudentOutput: z.boolean().optional(),
// });
// export type CollectionRequestDTO = z.infer<typeof collectionRequestSchema>;
// export const parseToCollectionRequestDTO = collectionRequestSchema.parse;
