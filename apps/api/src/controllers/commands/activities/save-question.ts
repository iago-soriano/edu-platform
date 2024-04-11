import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "../../interfaces";
import {
  parseToQuestionRequestDTO,
  SaveQuestionParams,
  SaveQuestionResponseBody,
  SaveQuestionRequestBody,
} from "@edu-platform/common";
import { ISaveQuestionUseCase } from "@application/use-cases";

type Request = TypedRequest<SaveQuestionParams, {}, SaveQuestionRequestBody>;
type Response = TypedResponse<SaveQuestionResponseBody>;

export class SaveQuestionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activities/:activityId/versions/draft/questions";
  middlewares: string[] = ["auth"];

  constructor(private saveQuestionUseCase: ISaveQuestionUseCase) {}

  async execute(req: Request, res: Response) {
    const questionDto = parseToQuestionRequestDTO(req.body);

    const { activityId } = req.params;
    const { user } = req;

    await this.saveQuestionUseCase.execute({
      questionDto,
      user,
      activityId,
    });

    res.status(200).json();
  }
}
