import { ISignInUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
  SignInRequestBody,
  SignInResponseBody,
  SignInHTTPDefinition
} from '@edu-platform/common/api';

type Request = TypedRequest<{}, {}, SignInRequestBody>;
type Response = TypedResponse<SignInResponseBody>

export class SignInController implements HTTPController {

  method: HTTPMethod = SignInHTTPDefinition.method;
  path: string = SignInHTTPDefinition.path;

  constructor(private signInUseCase: ISignInUseCase) {}

  async execute(
    { body }: Request, 
    res: Response
  ) {
    const { email, password } = body;

    const resp = await this.signInUseCase.execute({
      email,
      password,
    });

    res.status(200).json(resp);
  }
}
