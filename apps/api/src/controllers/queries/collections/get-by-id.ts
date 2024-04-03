import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  GetCollectionParams,
  GetCollectionResponseBody,
} from "@edu-platform/common";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<GetCollectionParams, {}, {}>;
type Response = TypedResponse<GetCollectionResponseBody>;

export class GetCollectionController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "collection/:collectionId";
  middlewares: string[] = ["auth"];

  constructor() {}

  async execute(req: Request, res: Response) {
    const { user } = req;

    const { collectionId } = parseNumberId(req.params, ["collectionId"]);

    // const collection = await this.collectionsRepository.getById(collectionId);
    // if (!collection) throw new Error("Coleção não encontrada");

    // if (collection.owner.id !== user.id)
    //   throw new Error("Collection not found");

    return res.status(200).json();
  }
}
