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
import { ContentDtoMapper } from "@dto-mappers";
import { ISaveContentUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<SaveContentParams, {}, SaveContentRequestBody>;
type Response = TypedResponse<SaveContentResponseBody>;

export class SaveContentController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activity/:activityId/version/:versionId/content";
  middlewares: string[] = ["auth", "file"];

  constructor(private saveContentUseCase: ISaveContentUseCase) {}

  async execute(req: Request, res: Response) {
    const contentDto = parseToContentRequestDTO(req.body);

    if (req.files?.image?.[0]) {
      if (!contentDto.payload) contentDto.payload = { image: undefined };
      contentDto.payload.image = { file: req.files?.image?.[0] };
    }

    if (!contentDto.type) throw new Error("Informar tipo de conteúdo");

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const content = ContentDtoMapper.mapFromDto(contentDto, { id: versionId });

    const { user } = req;

    await this.saveContentUseCase.execute({
      content,
      user,
      activityId,
      versionId,
    });

    res.status(200).json();
  }
}
