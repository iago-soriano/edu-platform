import { z } from "zod";
import { UnprocessableEntity } from "@edu-platform/common";

export const parseNumberId = (params: any, fields: string[]) => {
  const response: { [field: string]: number } = {};

  for (const field of fields) {
    try {
      response[field] = z.coerce.number().parse(params[field]);
    } catch (ex) {
      throw new UnprocessableEntity((ex as Error).message);
    }
  }

  return response;
};
