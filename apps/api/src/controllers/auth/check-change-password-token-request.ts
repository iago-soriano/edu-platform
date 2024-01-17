import { ICheckChangePasswordTokenRequestUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CheckChangePasswordTokenRequestQueryParams,
  CheckChangePasswordTokenResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, CheckChangePasswordTokenRequestQueryParams, {}>;
type Response = TypedResponse<CheckChangePasswordTokenResponseBody>;

export class CheckChangePasswordTokenRequestController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "check-token-validity";

  constructor(
    private checkChangePasswordTokenRequestUseCase: ICheckChangePasswordTokenRequestUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { token } = req.query;

    const isTokenValid =
      await this.checkChangePasswordTokenRequestUseCase.execute({
        token,
      });

    res.status(201).json({ isValid: isTokenValid });
  }
}
