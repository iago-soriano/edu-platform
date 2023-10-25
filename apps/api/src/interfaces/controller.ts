import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import { UserDTO } from "@interfaces";

export type HTTPMethod = "post" | "get" | "put" | "patch" | "delete";

export interface HTTPController {
  method: HTTPMethod;
  path: string;
  middlewares?: string[];
  execute: RequestHandler;
}

export interface HTTPErrorController {
  execute: ErrorRequestHandler;
}

export type Request<Params = {}, Query = {}, Body = {}> = ExpressRequest<
  Params,
  {},
  Body,
  Query
> & { user: UserDTO };
export type Response<Body> = ExpressResponse<Body>;

export interface HTTPControllerDefinition {
  method: HTTPMethod;
  path: string;
}
