import { IChangePasswordRequestUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ChangePasswordRequestRequestBody,
  ChangePasswordRequestResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, ChangePasswordRequestRequestBody>;
type Response = TypedResponse<ChangePasswordRequestResponseBody>;

export class ChangePasswordRequestController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "change-password-request";

  constructor(
    private changePasswordRequestUseCase: IChangePasswordRequestUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { email } = req.body;

    await this.changePasswordRequestUseCase.execute({
      email,
    });

    res.status(201).json({});
  }
}
