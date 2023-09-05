import { ISignInUseCase } from "@application/use-cases";
import { HTTPController, Request as TypedRequest, Response } from "@presentation/interfaces";

interface RequestBody{ email: string, password: string }
type Request = TypedRequest<{}, {}, RequestBody>;

export class SignInController implements HTTPController {

  method: string = 'post';
  path: string = 'sessions';

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
