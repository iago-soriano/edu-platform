import {
  HTTPController,
  HTTPMethod,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  GetTopicsRequestBody,
  GetTopicsResponseBody,
} from "@edu-platform/common/api";
import { IGetTopicsUseCase } from "application/use-cases/get-topics";

type Request = TypedRequest<{}, {}, GetTopicsRequestBody>;
type Response = TypedResponse<GetTopicsResponseBody>;

export class GetTopicsController implements HTTPController {
  method = HttpMethod.GET;
  path = "topics";
  middlewares: string[] = ["auth"];

  constructor(private getTopicsUseCase: IGetTopicsUseCase) {}

  async execute(req: Request, res: Response) {
    const { topics } = await this.getTopicsUseCase.execute();

    res.status(200).json({ topics });
  }
}
