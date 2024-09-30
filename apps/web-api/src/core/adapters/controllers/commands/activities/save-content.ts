import {
  Request as TypedRequest,
  Response as TypedResponse,
} from "@edu-platform/common/platform/interfaces";
import {
  SaveContentParams,
  saveContentParamsSchema as paramsSchema,
  SaveContentRequestBody,
  saveContentRequestSchema as bodySchema,
  SaveContentResponseBody,
} from "@edu-platform/common";
import { ISaveContentUseCase } from "@core/application/use-cases";
import {
  Middlewares,
  Post,
  ValidateParameters,
} from "@edu-platform/common/platform";

type Request = TypedRequest<SaveContentParams, {}, SaveContentRequestBody>;
type Response = TypedResponse<SaveContentResponseBody>;

interface Deps {
  saveContentUseCase: ISaveContentUseCase;
}

@Post("activities/:activityId/versions/draft/contents")
@ValidateParameters({
  paramsSchema,
  bodySchema,
})
@Middlewares(["auth"])
export class SaveContentController {
  private _saveContentUseCase: ISaveContentUseCase;

  constructor(deps: Deps) {
    this._saveContentUseCase = deps.saveContentUseCase;
  }

  async execute(req: Request, res: Response) {
    const contentDto = req.body;

    if (req.files?.image?.[0]) {
      if (!contentDto.payload) contentDto.payload = { image: undefined };
      contentDto.payload.image = { file: req.files?.image?.[0] };
    }

    const { activityId } = req.params;
    const { user } = req;

    await this._saveContentUseCase.execute({
      contentDto,
      user,
      activityId,
    });

    res.sendStatus(200);
  }
}
