import { ISignInUseCase } from "@iam/application/use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  SignInRequestBody,
  SignInResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, SignInRequestBody>;
type Response = TypedResponse<SignInResponseBody>;

export class SignInController implements HTTPController<Request, Response> {
  method = HttpMethod.POST;
  path: string = "sign-in";

  constructor(private signInUseCase: ISignInUseCase) {}

  async execute({ body }: Request, res: Response) {
    const { email, password } = body;

    const resp = await this.signInUseCase.execute({
      email,
      password,
    });

    res.status(200).json(resp);
  }
}
