import { IChangePasswordUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ChangePasswordRequestBody,
  ChangePasswordResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, ChangePasswordRequestBody>;
type Response = TypedResponse<ChangePasswordResponseBody>;

export class ChangePasswordController implements HTTPController {
  method = HttpMethod.PUT;
  path: string = "change-password";

  constructor(private changePasswordUseCase: IChangePasswordUseCase) {}

  async execute(req: Request, res: Response) {
    const { changePasswordToken, newPassword, confirmNewPassword } = req.body;

    await this.changePasswordUseCase.execute({
      changePasswordToken,
      newPassword,
      confirmNewPassword,
    });

    res.status(201).json({});
  }
}
