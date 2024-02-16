import { z } from "zod";

export enum OutputStatus {
  Draft = "Draft",
  Completed = "Completed",
}

const outputStatusSchema = z.nativeEnum(OutputStatus);
export const parseOutputStatus = outputStatusSchema.parse;

export const studentOutputResponseSchema = z.object({
  id: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),

  status: z.nativeEnum(OutputStatus),

  userId: z.number(),
  versionId: z.number(),
});

export type StudentOutputResponseDTO = z.infer<
  typeof studentOutputResponseSchema
>;

export const studentOutputRequestSchema = z.object({
  id: z.number().optional(),

  status: z.nativeEnum(OutputStatus).optional(),
});

export type StudentOutputRequestDTO = z.infer<
  typeof studentOutputRequestSchema
>;
export const parseToStudentOutputRequestDTO = studentOutputRequestSchema.parse;
