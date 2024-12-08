import { Request as TypedRequest } from "@edu-platform/common/platform/interfaces";
import { User } from "@domain/entities";

export type Request<Params = {}, Query = {}, Body = {}> = TypedRequest<
  Params,
  Query,
  Body
> & { user: User };
