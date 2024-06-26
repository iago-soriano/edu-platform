import { IVerifyAccountUseCase } from "@iam/application/use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  VerifyAccountRequestBody,
  VerifyAccountResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, VerifyAccountRequestBody>;
type Response = TypedResponse<VerifyAccountResponseBody>;

export class VerifyAccountController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path: string = "iam/verify-account";

  constructor(private verifyAccountUseCase: IVerifyAccountUseCase) {}

  async execute(req: Request, res: Response) {
    const { verifyAccountToken } = req.body;

    await this.verifyAccountUseCase.execute({
      verifyAccountToken,
    });

    res.status(200).json({});
  }
}
