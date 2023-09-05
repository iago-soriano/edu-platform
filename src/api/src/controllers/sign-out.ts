import { ISignOutUseCase } from "@application/use-cases";
import { HTTPController, Request as TypedRequest, Response } from "@presentation/interfaces";

interface RequestBody{ email: string, password: string }
type Request = TypedRequest<{}, {}, RequestBody>;

export class SignOutController implements HTTPController {

  method: string = 'patch';
  path: string = 'sessions';
  middlewares: string[] = ['auth'];

  constructor(private signOutUseCase: ISignOutUseCase) {}

  async execute(
    { user }: Request, 
    res: Response
  ) {
    const { id, tokenVersion } = user;

    await this.signOutUseCase.execute({
      id,
      tokenVersion,
    });

    res.status(200);
  }
}
