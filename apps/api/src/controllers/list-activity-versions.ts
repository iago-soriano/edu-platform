import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IListActivityVersionsUseCase } from "@use-cases";
import {
  ListActivityVersionsQuery,
  ListActivityVersionsResponseBody,
  ListActivityVersionsRequestBody,
  parseVersionStatus,
} from "@edu-platform/common";
import { ActivityVersionDtoMapper } from "@dto-mappers";
import { VersionStatus } from "@domain";

type Request = TypedRequest<
  {},
  ListActivityVersionsQuery,
  ListActivityVersionsRequestBody
>;
type Response = TypedResponse<ListActivityVersionsResponseBody>;

export class ListActivityVersionsController
  implements HTTPController<Request, Response>
{
  method = HttpMethod.GET;
  path = "activity";
  middlewares: string[] = ["auth"];

  constructor(
    private listActivityVersionsUseCase: IListActivityVersionsUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const statuses =
      req.query.statuses?.split(",").map((s) => parseVersionStatus(s)) || [];
    const { user } = req;

    const activitiesByAuthorDtos =
      await this.listActivityVersionsUseCase.execute({
        user,
        statuses: statuses,
      });

    const resp: ListActivityVersionsResponseBody = {};

    for (const version in activitiesByAuthorDtos) {
      resp[version] = {
        [VersionStatus.Archived]: activitiesByAuthorDtos[version][
          VersionStatus.Archived
        ]?.map((domain) => ActivityVersionDtoMapper.mapToDto(domain)),
        [VersionStatus.Draft]:
          activitiesByAuthorDtos[version][VersionStatus.Draft] &&
          ActivityVersionDtoMapper.mapToDto(
            activitiesByAuthorDtos[version][VersionStatus.Draft]!
          ),
        [VersionStatus.Published]:
          activitiesByAuthorDtos[version][VersionStatus.Published] &&
          ActivityVersionDtoMapper.mapToDto(
            activitiesByAuthorDtos[version][VersionStatus.Published]!
          ),
      };
    }

    res.status(200).json(resp);
  }
}
