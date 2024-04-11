import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "../../interfaces";
import {
  SaveAnswerParams,
  SaveAnswerRequestBody,
  SaveAnswerResponseBody,
} from "@edu-platform/common";
import { ISaveAnswerUseCase } from "@application/use-cases";

type Request = TypedRequest<SaveAnswerParams, {}, SaveAnswerRequestBody>;
type Response = TypedResponse<SaveAnswerResponseBody>;

export class SaveAnswerController implements HTTPController<Request, Response> {
  method = HttpMethod.POST;
  path: string = "answer";
  middlewares: string[] = ["auth"];

  constructor(private saveAnswerUseCase: ISaveAnswerUseCase) {}

  async execute(req: Request, res: Response) {
    // const answerDto = parseToAnswerRequestDTO(req.body);
    // const { user } = req;

    // const answer = StudentAnswerDtoMapper.mapFromDto(answerDto);

    // await this.saveAnswerUseCase.execute({
    //   user,
    //   answer,
    // });

    res.status(200).json();
  }
}
