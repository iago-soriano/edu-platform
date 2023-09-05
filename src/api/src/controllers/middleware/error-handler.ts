import { CustomError } from "@common/errors";
import { Request, Response, HTTPErrorController } from "@presentation/interfaces";
// import { handlePrismaError } from "./prisma-error-handler";

export class ErrorHandlerController implements HTTPErrorController{
  execute(error: Error, _: Request, res: Response) {
      // const error = handlePrismaError(e);
      if (error instanceof CustomError) {
        res.status(error.HTTPstatusCode || 500).json(error.message);
      }
      res.status(500).json(error.toString());
    }
  };
