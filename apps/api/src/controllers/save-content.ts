import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { ContentDTO, parseToContentDTO } from "@dto";
import { ISaveContentUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

export type SaveContentRequestParams = {
  activityId: string;
  versionId: string;
};
export type SaveContentRequestBody = ContentDTO;
export type SaveContentResponseBody = void;

type Request = TypedRequest<
  { activityId: string; versionId: string },
  {},
  SaveContentRequestBody
>;
type Response = TypedResponse<SaveContentResponseBody>;

export class SaveContentController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activity/:activityId/version/:versionId/content";
  middlewares: string[] = ["auth", "file"];

  constructor(private saveContentUseCase: ISaveContentUseCase) {}

  async execute(req: Request, res: Response) {
    const contentDto = parseToContentDTO(req.body);
    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);
    const image = req.files?.image?.[0];
    contentDto.payload.image = { file: image };

    const { user } = req;

    await this.saveContentUseCase.execute({
      contentDto,
      user,
      activityId,
      versionId,
    });

    res.status(200).json();
  }
}
