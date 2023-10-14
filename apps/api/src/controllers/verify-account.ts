import { IVerifyAccountUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
    VerifyAccountRequestBody,
    VerifyAccountResponseBody,
    VerifyAccountHTTPDefinition
} from '@edu-platform/common/api';

type Request = TypedRequest<{}, {}, VerifyAccountRequestBody>;
type Response = TypedResponse<VerifyAccountResponseBody>

export class VerifyAccountController implements HTTPController {

  method: HTTPMethod = VerifyAccountHTTPDefinition.method;
  path: string = VerifyAccountHTTPDefinition.path;

  constructor(private verifyAccountUseCase: IVerifyAccountUseCase) {}

  async execute(req: Request, res: Response) {
    const { verifyAccountToken } = req.body;

    await this.verifyAccountUseCase.execute({
        verifyAccountToken,
    });

    res.status(200).json({});
  }
}