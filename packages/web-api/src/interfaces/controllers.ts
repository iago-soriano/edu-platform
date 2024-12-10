import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler,
  NextFunction,
} from "express";
import { User } from "@domain/entities";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export type TypedRequest<Params = {}, Query = {}, Body = {}> = {
  query: Query;
  params: Params;
  body: Body;
  files?: { image?: FileType[] };
};
export type Request<Params = {}, Query = {}, Body = {}> = TypedRequest<
  Params,
  Query,
  Body
> & { user: User };

export type Response<Body> = ExpressResponse<Body>;

export interface HTTPController<Request = {}, Response = {}> {
  method: HttpMethod;
  path: string;
  middlewares?: string[];
  execute: (req: Request, res: Response) => {};
  validationMiddleware?: RequestHandler;
}

export type FileType = Express.Multer.File;

export interface HTTPErrorController<Request = {}, Response = {}> {
  execute: (error: Error, req: Request, res: Response) => void;
}
