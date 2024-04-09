import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  parseToContentRequestDTO,
  SaveContentParams,
  SaveContentRequestBody,
  SaveContentResponseBody,
} from "@edu-platform/common";
import { ISaveContentUseCase } from "@use-cases";

type Request = TypedRequest<SaveContentParams, {}, SaveContentRequestBody>;
type Response = TypedResponse<SaveContentResponseBody>;

export class SaveContentController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activities/:activityId/versions/draft/contents";
  middlewares: string[] = ["auth", "file"];

  constructor(private saveContentUseCase: ISaveContentUseCase) {}

  async execute(req: Request, res: Response) {
    const contentDto = parseToContentRequestDTO(req.body);

    if (req.files?.image?.[0]) {
      if (!contentDto.payload) contentDto.payload = { image: undefined };
      contentDto.payload.image = { file: req.files?.image?.[0] };
    }

    const { activityId } = req.params;
    const { user } = req;

    await this.saveContentUseCase.execute({
      contentDto,
      user,
      activityId,
    });

    res.sendStatus(200);
  }
}
