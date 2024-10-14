import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";

import {
  Post,
  Middlewares,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  CreateStudentOutputRequestBody,
  CreateStudentOutputResponseBody,
  createNewStudentOutputRequestBodySchema as bodySchema,
} from "@edu-platform/common/api";
import { ICreateNewStudentOutputUseCase } from "application/use-cases";

type Request = TypedRequest<{}, {}, CreateStudentOutputRequestBody>;
type Response = TypedResponse<CreateStudentOutputResponseBody>;

interface Deps {
  createNewStudentOutputUseCase: ICreateNewStudentOutputUseCase;
}

@Post("student-outputs")
@ValidateParameters({ bodySchema })
@Middlewares(["auth"])
export class CreateNewStudentOutputController {
  private _createNewStudentOutputUseCase: ICreateNewStudentOutputUseCase;

  constructor(deps: Deps) {
    this._createNewStudentOutputUseCase = deps.createNewStudentOutputUseCase;
  }

  async execute(req: Request, res: Response) {
    const { activityId, studentEmail, requestingUserEmail } = req.body;

    const userId = req.user.id;

    await this._createNewStudentOutputUseCase.execute({
      activityId, // my activity
      userId, // logged user, teacher
      studentEmail,
    });

    res.sendStatus(200);
  }
}
