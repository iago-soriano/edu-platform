import { IProviderSignUpUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
  ProviderSignUpRequestBody,
  ProviderSignUpResponseBody,
  ProviderSignUpHTTPDefinition
} from '@edu-platform/common/api';

type Request = TypedRequest<{}, {}, ProviderSignUpRequestBody>;
type Response = TypedResponse<ProviderSignUpResponseBody>

export class ProviderSignUpController implements HTTPController {

  method: HTTPMethod = ProviderSignUpHTTPDefinition.method;
  path: string = ProviderSignUpHTTPDefinition.path;

  constructor(private providerSignUpUseCase: IProviderSignUpUseCase) {}
  
  async execute(req: Request, res: Response) {
    const { email, id, provider, image, name } = req.body;

    try {
      await this.providerSignUpUseCase.execute({
        email,
        name,
        id,
        provider,
        image
      });
    } catch (ex) {
      console.error(ex);
    }


    res.status(201).json({});
  }
}