import { CustomError } from "@edu-platform/common/errors";
import { Request, Response, HTTPErrorController } from "@interfaces";

export class ErrorHandlerController implements HTTPErrorController {
  execute(error: Error, _: Request, res: Response<{}>) {
    if (error instanceof CustomError) {
      console.log("ERRO NA APLICAÇÃO", error.errors, error.message);
      res
        .status(error.HTTPstatusCode || 500)
        .json({ message: error.message, errors: error.errors });
      return;
    }

    console.error(error);
    res.status(500).json(error.toString());
  }
}
