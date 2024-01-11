import { ActivityRepository } from "./../../infrastructure/repositories/activity";
import { IActivitiesRepository, Request } from "@interfaces";
import { Forbidden, Unauthorized } from "@edu-platform/common/errors";
import { TokenExpiredError } from "jsonwebtoken";

export class GetEntitiesMiddlewareController {
  constructor(private activityRepository: IActivitiesRepository) {}

  async execute(
    req: Request<unknown, {}, {}>,
    headers: Record<string, string>
  ) {
    const { activityId: actvIdStr, versionId: vrsnIdStr } = req.params;
  }
}
