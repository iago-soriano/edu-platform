import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import {
  ArchiveActivityParams,
  ArchiveActivityRequestBody,
  ArchiveActivityResponseBody,
} from "@edu-platform/common";
import { IUpdateActivityMetadataUseCase } from "@use-cases";
import { parseToVersionRequestDto } from "@edu-platform/common";
import { parseNumberId } from "@infrastructure";

type Request = TypedRequest<
  ArchiveActivityParams,
  {},
  ArchiveActivityRequestBody
>;
type Response = TypedResponse<ArchiveActivityResponseBody>;

export class ArchiveActivityController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.PATCH;
  path = "activities/:activityId/publish-version/archive";
  middlewares: string[] = ["auth"];

  constructor() {}

  async execute(req: Request, res: Response) {
    throw new Error("Not implemented");
  }
}
