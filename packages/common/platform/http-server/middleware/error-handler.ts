import {
  SilentInvalidStateError,
  InvalidStateError,
  CustomError,
} from "../../../errors";
import {
  Request as TypedRequest,
  Response as TypedResponse,
  HTTPErrorController,
} from "@edu-platform/common/platform/interfaces";
import { ZodError } from "zod";

type Request = TypedRequest<{}, {}, {}>;
type Response = TypedResponse<{}>;

export class ErrorHandlerController
  implements HTTPErrorController<Request, Response>
{
  execute(error: Error, _: Request, res: Response) {
    if (error instanceof InvalidStateError) {
      console.log(
        `ERRO ${error.fieldErrors} ${error.HTTPstatusCode} ${error.message}}`
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

    // console.error(error);
    res
      .status((error as CustomError)?.HTTPstatusCode || 500)
      .json(error.toString());
  }
}
