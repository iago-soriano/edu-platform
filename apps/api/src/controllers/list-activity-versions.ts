import {
  HTTPController,
  HttpMethod,
  Request as TypedRequest,
  Response as TypedResponse,
} from "@interfaces";
import { IListActivityVersionsByOwnershipUseCase } from "@use-cases";
import {
  ListActivityVersionsQuery,
  ListActivityVersionsResponseBody,
  ListActivityVersionsRequestBody,
  parseVersionStatus,
} from "@edu-platform/common";
import { ActivityVersionDtoMapper, CollectionDtoMapper } from "@dto-mappers";
import { VersionStatus } from "@domain";
import { parseNumberId } from "@infrastructure";

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
    private listByOwnershipUseCase: IListActivityVersionsByOwnershipUseCase,
    private listByParticipationUseCase: IListActivityVersionsByOwnershipUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const { user } = req;
    const { collectionId } = parseNumberId(req.query, ["coollectionId"]);

    let result: Awaited<
      ReturnType<IListActivityVersionsByOwnershipUseCase["execute"]>
    > = {};

    if (req.query.byOwnership) {
      result = await this.listByOwnershipUseCase.execute({
        user,
        collectionId,
      });
    } else {
      result = await this.listByParticipationUseCase.execute({
        user,
        collectionId,
      });
    }

    const resp: ListActivityVersionsResponseBody = {};

    for (const collectionId in result) {
      const { collection, activities } = result[collectionId];
      resp[collectionId] = {
        activities: activities.map((act) => ({
          [VersionStatus.Draft]:
            act[VersionStatus.Draft] &&
            ActivityVersionDtoMapper.mapToDto(act[VersionStatus.Draft]),
          [VersionStatus.Archived]: act[VersionStatus.Archived]?.length
            ? act[VersionStatus.Archived].map((arch) =>
                ActivityVersionDtoMapper.mapToDto(arch)
              )
            : undefined,
          [VersionStatus.Published]:
            act[VersionStatus.Published] &&
            ActivityVersionDtoMapper.mapToDto(act[VersionStatus.Published]),
          activityId: act.activityId,
        })),
        collection: CollectionDtoMapper.mapToDto(collection),
      };
    }

    res.status(200).json(resp);
  }
}
