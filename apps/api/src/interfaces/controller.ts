import { Response as ExpressResponse } from "express";
import { UserSelectDTO } from "./repository/dtos";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export type Request<Params = {}, Query = {}, Body = {}> = {
  params: Params;
  query: Query;
  body: Body;
  user: UserSelectDTO;
  files?: { image?: FileType[] };
};
export type Response<Body> = ExpressResponse<Body>;

export interface HTTPController<Request = {}, Response = {}> {
  method: HttpMethod;
  path: string;
  middlewares?: string[];
  execute: (req: Request, res: Response) => {};
}

export type FileType = Express.Multer.File;

export interface HTTPErrorController<Request = {}, Response = {}> {
  execute: (error: Error, req: Request, res: Response) => void;
}
