import { ISignUpUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SignUpRequestBody,
  SignUpResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, SignUpRequestBody>;
type Response = TypedResponse<SignUpResponseBody>;

export class SignUpController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "sign-up";

  constructor(private signUpUseCase: ISignUpUseCase) {}

  async execute(req: Request, res: Response) {
    const { email, password, confirmPassword, name } = req.body;

    await this.signUpUseCase.execute({
      email,
      name,
      password,
      confirmPassword,
    });

    res.status(201).json({});
  }
}
