import { ISignOutUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SignOutRequestBody,
  SignOutResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, SignOutRequestBody>;
type Response = TypedResponse<SignOutResponseBody>;

export class SignOutController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "sign-out";
  middlewares: string[] = ["auth"];

  constructor(private signOutUseCase: ISignOutUseCase) {}

  async execute(req: Request, res: Response) {
    const { id, tokenVersion } = req.user;

    await this.signOutUseCase.execute({
      id,
      tokenVersion,
    });

    res.status(200).json("");
  }
}
