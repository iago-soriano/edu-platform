import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  SaveContentRequestBody,
  SaveContentResponseBody,
} from "@edu-platform/common/api";
import { ISaveQuestionUseCase } from "@use-cases";

type Request = TypedRequest<{}, {}, SaveContentRequestBody>;
type Response = TypedResponse<SaveContentResponseBody>;

export class SaveContentController implements HTTPController {
  method = HttpMethod.PUT;
  path: string = "activities/:activityId/contents";
  middlewares: string[] = ["auth"];

  constructor(private saveQuestionUseCase: ISaveQuestionUseCase) {}

  async execute(req: Request, res: Response) {
    const { title, content, description, type, contentId, activityVersionId } =
      req.body;

    res.status(200).json();
  }
}

// VERIFICAR O TIPO COM UM SWITCH E CHAMAR USE CASE DIFERENTE
