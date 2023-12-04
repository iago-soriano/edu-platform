import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  ErrorRequestHandler,
  RequestHandler,
} from "express";
import { UserSelectDTO } from "./repository/dtos";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export interface HTTPController {
  method: HttpMethod;
  path: string;
  middlewares?: string[];
  execute: RequestHandler;
}

export type FileType = Express.Multer.File;

export interface HTTPErrorController {
  execute: ErrorRequestHandler;
}

export type Request<Params = {}, Query = {}, Body = {}> = ExpressRequest<
  Params,
  {},
  Body,
  Query
> & { user: UserSelectDTO; files?: { image?: FileType[]; audio?: FileType[] } };
export type Response<Body> = ExpressResponse<Body>;
