import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  Post,
  Middlewares,
} from "@edu-platform/common/platform/http-server/decorators";
import { SignUpResponseBody } from "@edu-platform/common/api";
import { ICreateUserUseCase } from "application/use-cases";

type Request = TypedRequest<{}, {}, any>;
type Response = TypedResponse<SignUpResponseBody>;

interface Deps {
  signUpUseCase: ICreateUserUseCase;
}

@Post("webhook/user/register")
@Middlewares(["webhookSignature"])
export class RegisterUserWebhook {
  private _signUpUseCase: ICreateUserUseCase;

  constructor(deps: Deps) {
    this._signUpUseCase = deps.signUpUseCase;
  }

  async execute(req: Request, res: Response) {
    console.log("KEYCLOAK user register payload", req.body);

    const { details } = req.body;

    await this._signUpUseCase.execute({
      firstName: details.first_name,
      lastName: details.last_name,
      email: details.email,
    });

    res.status(200).json();
  }
}
