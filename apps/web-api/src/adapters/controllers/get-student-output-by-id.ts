import { Response as TypedResponse } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";

import {
  Middlewares,
  Get,
  ValidateParameters,
} from "@edu-platform/common/platform/http-server/decorators";
import {
  GetStudentOutputByIdParams,
  GetStudentOutputByIdResponseBody,
  getStudentOutputByIdParamsSchema as paramsSchema,
} from "@edu-platform/common/api";
import { IStudentOutputsReadRepository } from "@application/interfaces";

type Request = TypedRequest<GetStudentOutputByIdParams, {}, {}>;
type Response = TypedResponse<GetStudentOutputByIdResponseBody>;

interface Deps {
  studentOutputsReadRepository: IStudentOutputsReadRepository;
}

@Get("student-output/:studentOutputId")
@ValidateParameters({ paramsSchema })
@Middlewares(["auth"])
export class GetStudentOutputByIdController {
  private _studentOutputReadRepository: IStudentOutputsReadRepository;

  constructor(deps: Deps) {
    this._studentOutputReadRepository = deps.studentOutputsReadRepository;
  }

  async execute(req: Request, res: Response) {
    const { studentOutputId } = req.params;

    const resp =
      await this._studentOutputReadRepository.getStudentOutputById(
        studentOutputId
      );

    res.status(200).json(resp);
  }
}
