import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { GetActivitiesResponseBody } from "@edu-platform/common/api";
import { IGetActivitiesUseCase } from "@use-cases";

type Request = TypedRequest<{}, { statuses: string }, {}>;
type Response = TypedResponse<GetActivitiesResponseBody>;

export class GetActivitiesController implements HTTPController {
  method = HttpMethod.GET;
  path = "activities";
  middlewares: string[] = ["auth"];

  constructor(private getActivitiesUseCase: IGetActivitiesUseCase) {}

  async execute(req: Request, res: Response) {
    const { statuses } = req.query;
    const { user } = req;

    console.log("getting activities", user.email);
    const activitiesByAuthor = await this.getActivitiesUseCase.execute({
      user,
      statuses: statuses ? statuses.split(",") : [],
    });

    res.status(200).json(activitiesByAuthor);
  }
}
