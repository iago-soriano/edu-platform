import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ListStudentsOfCollectionParams,
  ListStudentsOfCollectionResponseBody,
} from "@edu-platform/common";
import { IListUsersInCollectionUseCase } from "@use-cases";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<ListStudentsOfCollectionParams, {}, {}>;
type Response = TypedResponse<ListStudentsOfCollectionResponseBody>;

export class ListUsersInCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "collection/:collectionId/student";
  middlewares: string[] = ["auth"];

  constructor(
    private listUsersInCollectionUseCase: IListUsersInCollectionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    const resp = await this.listUsersInCollectionUseCase.execute({
      user,
      collectionId,
    });

    res.status(200).json(resp);
  }
}
