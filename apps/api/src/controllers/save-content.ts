import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { ContentDTO, parseToContentDTO } from "@edu-platform/common";
import { ContentDtoMapper } from "@dto-mappers";
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
    contentDto.payload.image = { file: req.files?.image?.[0] };

    const content = ContentDtoMapper.mapFromDto(contentDto);
    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const { user } = req;

    const response = await this.saveContentUseCase.execute({
      content,
      user,
      activityId,
      versionId,
    });

    res.status(200).json();
  }
}
