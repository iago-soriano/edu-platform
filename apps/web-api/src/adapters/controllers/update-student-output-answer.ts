import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Middlewares,
  Put,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  updateStudentOutputAnswerParamsSchema as paramsSchema,
  updateStudentOutputAnswerRequestBodySchema as bodySchema,
  UpdateStudentOutputAnswerResponseBody,
  UpdateStudentOutputAnswerRequestBody,
  UpdateStudentOutputAnswerParams,
} from "@edu-platform/common/api";
import { IUpdateStudentOutputAnswerUseCase } from "application/use-cases";

type Request = TypedRequest<
  UpdateStudentOutputAnswerParams,
  {},
  UpdateStudentOutputAnswerRequestBody
>;
type Response = TypedResponse<UpdateStudentOutputAnswerResponseBody>;

interface Deps {
  updateStudentOutputAnswerUseCase: IUpdateStudentOutputAnswerUseCase;
}

@Put("student-output/:studentOutputId/answer")
@ValidateParameters({ bodySchema, paramsSchema })
@Middlewares(["auth"])
export class UpdateStudentOutputAnswerController {
  private _updateStudentOutputAnswerUseCase: IUpdateStudentOutputAnswerUseCase;

  constructor(deps: Deps) {
    this._updateStudentOutputAnswerUseCase =
      deps.updateStudentOutputAnswerUseCase;
  }

  async execute(req: Request, res: Response) {
    const { answers } = req.body;
    const { studentOutputId } = req.params;

    const userId = req.user.id;

    await this._updateStudentOutputAnswerUseCase.execute({
      answers,
      studentOutputId,
    });

    res.status(200).send({ outputId: studentOutputId });
  }
}
