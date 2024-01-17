import { IRefreshTokenUseCase } from "@use-cases";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  RefreshTokenRequestBody,
  RefreshTokenResponseBody,
} from "@edu-platform/common/api";

type Request = TypedRequest<{}, {}, RefreshTokenRequestBody>;
type Response = TypedResponse<RefreshTokenResponseBody>;

export class RefreshTokenController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "refresh-token";

  constructor(private refreshTokenUseCase: IRefreshTokenUseCase) {}

  async execute({ body }: Request, res: Response) {
    const { refreshToken } = body;

    const resp = await this.refreshTokenUseCase.execute({
      refreshToken,
    });

    res.status(200).json(resp);
  }
}
