import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { parseToQuestionRequestDTO } from "@edu-platform/common";
import {
  SaveQuestionParams,
  SaveQuestionResponseBody,
  SaveQuestionRequestBody,
} from "@edu-platform/common";
import { ISaveQuestionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";
import { QuestionDtoMapper } from "@dto-mappers";

type Request = TypedRequest<SaveQuestionParams, {}, SaveQuestionRequestBody>;
type Response = TypedResponse<SaveQuestionResponseBody>;

export class SaveQuestionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activity/:activityId/version/:versionId/question";
  middlewares: string[] = ["auth"];

  constructor(private saveQuestionUseCase: ISaveQuestionUseCase) {}

  async execute(req: Request, res: Response) {
    const questionDto = parseToQuestionRequestDTO(req.body);
    const question = QuestionDtoMapper.mapFromDto(questionDto);

    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const { user } = req;

    await this.saveQuestionUseCase.execute({
      question,
      user,
      versionId,
      activityId,
    });

    res.status(200).json();
  }
}