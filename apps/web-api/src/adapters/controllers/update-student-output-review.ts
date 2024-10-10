import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import {
  Middlewares,
  Put,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  updateStudentOutputReviewParamsSchema as paramsSchema,
  updateStudentOutputReviewRequestBodySchema as bodySchema,
  UpdateStudentOutputReviewResponseBody,
  UpdateStudentOutputReviewRequestBody,
  UpdateStudentOutputReviewParams,
} from "@edu-platform/common/api";
import { IUpdateStudentOutputReviewUseCase } from "application/use-cases";

type Request = TypedRequest<
  UpdateStudentOutputReviewParams,
  {},
  UpdateStudentOutputReviewRequestBody
>;
type Response = TypedResponse<UpdateStudentOutputReviewResponseBody>;

interface Deps {
  updateStudentOutputReviewUseCase: IUpdateStudentOutputReviewUseCase;
}

@Put("student-output/:studentOutputId/answer")
@ValidateParameters({ bodySchema, paramsSchema })
@Middlewares(["auth"])
export class UpdateStudentOutputReviewController {
  private _updateStudentOutputReviewUseCase: IUpdateStudentOutputReviewUseCase;

  constructor(deps: Deps) {
    this._updateStudentOutputReviewUseCase =
      deps.updateStudentOutputReviewUseCase;
  }

  async execute(req: Request, res: Response) {
    const { blockId, review } = req.body;
    const { studentOutputId } = req.params;

    const userId = req.user.id;

    await this._updateStudentOutputReviewUseCase.execute({
      blockId,
      review,
      studentOutputId,
    });

    res.sendStatus(200);
  }
}
