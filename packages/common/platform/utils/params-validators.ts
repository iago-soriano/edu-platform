import { z } from "zod";
// import { UnprocessableEntity } from "@edu-platform/common";

// TODO deprecate
export const parseNumberId = (params: any, fields: string[]) => {
  const response: { [field: string]: number } = {};

  for (const field of fields) {
    if (!params[field]) continue;
    try {
      response[field] = z.coerce.number().parse(params[field]);
    } catch (ex) {
      throw new Error((ex as Error).message);
    }
  }

  return response;
};
