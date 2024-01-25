import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { QuestionDTO, parseToQuestionDTO } from "@dto";
import { ISaveQuestionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

export type SaveQuestionRequestParams = {
  activityId: string;
  versionId: string;
};
export type SaveQuestionRequestBody = QuestionDTO;
export type SaveQuestionResponseBody = void;

type Request = TypedRequest<
  { activityId: string; versionId: string },
  {},
  SaveQuestionRequestBody
>;
type Response = TypedResponse<SaveQuestionResponseBody>;

export class SaveQuestionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.POST;
  path: string = "activity/:activityId/version/:versionId/question";
  middlewares: string[] = ["auth"];

  constructor(private saveQuestionUseCase: ISaveQuestionUseCase) {}

  async execute(req: Request, res: Response) {
    const questionDto = parseToQuestionDTO(req.body);
    const { activityId, versionId } = parseNumberId(req.params, [
      "activityId",
      "versionId",
    ]);

    const { user } = req;

    const response = await this.saveQuestionUseCase.execute({
      questionDto,
      user,
      activityId,
      versionId,
    });

    res.status(200).json();
  }
}
