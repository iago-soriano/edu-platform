import { ICheckChangePasswordTokenRequestUseCase } from "@use-cases";
import {
  HTTPController,
  HTTPMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  CheckChangePasswordTokenRequestQueryParams,
  CheckChangePasswordTokenResponseBody,
  CheckChangePasswordTokenHTTPDefinition,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, CheckChangePasswordTokenRequestQueryParams, {}>;
type Response = TypedResponse<CheckChangePasswordTokenResponseBody>;

export class CheckChangePasswordTokenRequestController
  implements HTTPController
{
  method: HTTPMethod = CheckChangePasswordTokenHTTPDefinition.method;
  path: string = CheckChangePasswordTokenHTTPDefinition.path;

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
