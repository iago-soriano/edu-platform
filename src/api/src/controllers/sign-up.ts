import { ISignUpUseCase } from "@application/use-cases";
import { HTTPController, Request as TypedRequest, Response } from "@presentation/interfaces";

interface RequestBody{ email: string, password: string, confirmPassword: string, name: string }
type Request = TypedRequest<{}, {}, RequestBody>;

export class SignUpController  implements HTTPController {

  method: string = 'post';
  path: string = 'sessions';

  constructor(private signUpUseCase: ISignUpUseCase) {}

  async execute(req: Request, res: Response) {
    const { email, password, confirmPassword, name } = req.body;

    await this.signUpUseCase.execute({
      email,
      name,
      password,
      confirmPassword,
    });

    res.status(201);
  }
}