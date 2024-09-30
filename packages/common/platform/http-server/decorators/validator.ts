import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from "express";

export function ValidateParameters<
  T extends { new (...args: any[]): {} },
>(args: {
  paramsSchema?: { parse: (args: any) => any };
  bodySchema?: { parse: (args: any) => any };
}) {
  return function (constructor: T) {
    return class extends constructor {
      validationMiddleware = (
        req: ExpressRequest,
        res: ExpressResponse,
        next: NextFunction
      ) => {
        const { paramsSchema, bodySchema } = args;
        req.query = { ...req.query, ...req.params };
        if (paramsSchema) paramsSchema.parse(req.query);
        if (bodySchema) bodySchema.parse({ ...req.body });
        next();
      };
    };
  };
}
