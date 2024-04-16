import { ISignOutUseCase } from "@application/use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  SignOutRequestBody,
  SignOutResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, SignOutRequestBody>;
type Response = TypedResponse<SignOutResponseBody>;

export class SignOutController implements HTTPController<Request, Response> {
  method = HttpMethod.POST;
  path: string = "sign-out";

  constructor(private signOutUseCase: ISignOutUseCase) {}

  async execute({ body }: Request, res: Response) {
    const { refreshToken } = body;

    await this.signOutUseCase.execute({
      refreshToken,
    });

    res.status(200).json("");
  }
}
