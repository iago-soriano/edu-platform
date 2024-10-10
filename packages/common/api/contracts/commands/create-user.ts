export interface SignUpRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
export interface SignUpResponseBody {}

import { z } from "zod";

type Params = void;

const createUserRequestSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

type RequestBody = z.infer<typeof createUserRequestSchema>;

interface ResponseBody {
  userId: string;
}

export type {
  Params as CreateUserParams,
  RequestBody as CreateUserRequestBody,
  ResponseBody as CreateUserResponseBody,
};
export { createUserRequestSchema };
