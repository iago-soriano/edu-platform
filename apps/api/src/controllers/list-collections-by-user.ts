import { collections } from "./../infrastructure/repository/schema";
import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ListCollectionsByUserParams,
  ListCollectionsByUserRequestBody,
  ListCollectionsByUserResponseBody,
} from "@edu-platform/common";
import { IListCollectionsByUserUseCase } from "@use-cases";

type Request = TypedRequest<
  ListCollectionsByUserParams,
  {},
  ListCollectionsByUserRequestBody
>;
type Response = TypedResponse<ListCollectionsByUserResponseBody>;

export class ListCollectionsByUserController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path: string = "collection";
  middlewares: string[] = ["auth", "file"];

  constructor(
    private listCollectionsByUserUseCase: IListCollectionsByUserUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const resp = await this.listCollectionsByUserUseCase.execute({
      user,
    });

    res.status(200).json(resp);
  }
}
