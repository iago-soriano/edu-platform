import { IProviderSignInUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
  ProviderSignInRequestBody,
  ProviderSignInResponseBody,
  ProviderSignInHTTPDefinition
} from '@edu-platform/common/api';

type Request = TypedRequest<{}, {}, ProviderSignInRequestBody>;
type Response = TypedResponse<ProviderSignInResponseBody>

export class ProviderSignInController implements HTTPController {

  method: HTTPMethod = ProviderSignInHTTPDefinition.method;
  path: string = ProviderSignInHTTPDefinition.path;

  constructor(private providerSignInUseCase: IProviderSignInUseCase) {}

  async execute(
    { body }: Request, 
    res: Response
  ) {
    const { email, provider } = body;

    const resp = await this.providerSignInUseCase.execute({
      email,
      provider
    });

    res.status(200).json(resp);
  }
}
