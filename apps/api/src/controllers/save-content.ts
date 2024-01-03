import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SaveContentRequestBody,
  SaveContentResponseBody,
  SaveContentRequestParams,
} from "@edu-platform/common/api";
import { ISaveContentUseCase } from "@use-cases";

type Request = TypedRequest<
  SaveContentRequestParams,
  {},
  SaveContentRequestBody
>;
type Response = TypedResponse<SaveContentResponseBody>;

export class SaveContentController implements HTTPController {
  method = HttpMethod.POST;
  path: string = "activity/:activityId/version/:versionId/content";
  middlewares: string[] = ["auth", "file"];

  constructor(private saveContentUseCase: ISaveContentUseCase) {}

  async execute(req: Request, res: Response) {
    const {
      title,
      description,
      type,
      contentId: cntntIdStr,
      payload,
      order,
    } = req.body;
    const { activityId: actvIdStr, versionId: vrsnIdStr } = req.params;
    const image = req.files?.image[0];
    const activityId = parseInt(actvIdStr);
    const versionId = parseInt(vrsnIdStr);
    const contentId = cntntIdStr && parseInt(cntntIdStr);

    const { user } = req;

    await this.saveContentUseCase.execute({
      title,
      description,
      type,
      contentId,
      order,
      payload: {
        ...payload,
        image,
      },
      user,
      activityId,
      versionId,
    });

    res.status(200).json();
  }
}
