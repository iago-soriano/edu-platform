import { IChangePasswordRequestUseCase } from "@use-cases";
import { 
  HTTPController, 
  HTTPMethod, 
  Request as TypedRequest, 
  Response as TypedResponse,
} from "@interfaces";
import {
  ChangePasswordRequestRequestBody,
    ChangePasswordRequestResponseBody,
    ChangePasswordRequestHTTPDefinition
} from '@edu-platform/common/api';


type Request = TypedRequest<{}, {}, ChangePasswordRequestRequestBody>;
type Response = TypedResponse<ChangePasswordRequestResponseBody>

export class ChangePasswordRequestController implements HTTPController {

  method: HTTPMethod = ChangePasswordRequestHTTPDefinition.method;
  path: string = ChangePasswordRequestHTTPDefinition.path;

  constructor(private changePasswordRequestUseCase: IChangePasswordRequestUseCase) {}

  async execute(req: Request, res: Response) {
    
    const { email } = req.body;

    await this.changePasswordRequestUseCase.execute({
      email
    })

    res.status(201).json({});
  }
}