import { ISignUpUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
  SignUpRequestBody,
  SignUpResponseBody,
  SignUpHTTPDefinition
} from '@edu-platform/common/api';

type Request = TypedRequest<{}, {}, SignUpRequestBody>;
type Response = TypedResponse<SignUpResponseBody>

export class SignUpController implements HTTPController {

  method: HTTPMethod = SignUpHTTPDefinition.method;
  path: string = SignUpHTTPDefinition.path;

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