import { IProviderSignUpUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ProviderSignUpRequestBody,
  ProviderSignUpResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, ProviderSignUpRequestBody>;
type Response = TypedResponse<ProviderSignUpResponseBody>;

export class ProviderSignUpController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "sign-up/provider";

  constructor(private providerSignUpUseCase: IProviderSignUpUseCase) {}

  async execute(req: Request, res: Response) {
    const { email, id, provider, image, name } = req.body;

    await this.providerSignUpUseCase.execute({
      email,
      name,
      id,
      provider,
      image,
    });

    res.status(201).json();
  }
}
