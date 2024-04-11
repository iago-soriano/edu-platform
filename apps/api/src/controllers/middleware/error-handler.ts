import {
  CustomError,
  SilentInvalidStateError,
  InvalidStateError,
} from "@edu-platform/common/errors";
import {
  Request as TypedRequest,
  Response as TypedResponse,
  HTTPErrorController,
} from "../interfaces";

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
    }

    // console.error(error);
    res.status(500).json(error.toString());
  }
}
