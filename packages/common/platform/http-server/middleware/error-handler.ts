import {
  SilentInvalidStateError,
  InvalidStateError,
  CustomError,
} from "../../../errors";
import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { ZodError } from "zod";

export function ErrorMiddleware(
  error: Error,
  _: ExpressRequest,
  res: ExpressResponse,
  __: NextFunction,
) {
  if (error instanceof InvalidStateError) {
    console.log(
      `ERRO ${JSON.stringify(error.fieldErrors)} ${error.HTTPstatusCode} ${error.message}`,
    );

    res
      .status(error.HTTPstatusCode || 500)
      .json({ message: error.message, errors: error.fieldErrors });
    return;
  } else if (error instanceof SilentInvalidStateError) {
    console.log(error.realReason);
  } else if (error.name === "ZodError") {
    const zodError = error as ZodError;
    res.status(422).json({
      message: `Invalid value for ${zodError.issues[0].path}: ${zodError.issues[0].message}`,
    });
    return;
  }

  res
    .status((error as CustomError)?.HTTPstatusCode || 500)
    .json({ message: error.message || error.toString() });
}
