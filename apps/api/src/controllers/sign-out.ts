import { ISignOutUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
  SignOutRequestBody,
  SignOutResponseBody,
  SignOutHTTPDefinition
} from '@edu-platform/common/api';

type Request = TypedRequest<{}, {}, SignOutRequestBody>;
type Response = TypedResponse<SignOutResponseBody>

export class SignOutController implements HTTPController {

  method: HTTPMethod = SignOutHTTPDefinition.method;
  path: string = SignOutHTTPDefinition.path;
  middlewares: string[] = ['auth'];

  constructor(private signOutUseCase: ISignOutUseCase) {}

  async execute(
    req: Request, 
    res: Response
  ) {
    const { id, tokenVersion } = req.user;

    await this.signOutUseCase.execute({
      id,
      tokenVersion,
    });

    res.status(200).json("");
  }
}
