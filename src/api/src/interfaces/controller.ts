import { Request as ExpressRequest, Response as ExpressResponse, ErrorRequestHandler, RequestHandler } from "express";
import { UserDTO } from "@application/interfaces";

export interface HTTPController {
    method: string;
    path: string;
    middlewares?: string[];
    execute: RequestHandler
}

export interface HTTPErrorController {
  execute: ErrorRequestHandler;
}

export type Request<Params = {}, Query = {}, Body = {}> = ExpressRequest<Params, {}, Body, Query> & { user: UserDTO };
export type Response = ExpressResponse;

export interface IPaginatedResponse<T> {
    data: T[];
    cursor: number;
  }
  
  export interface IPaginatedParams {
    cursor: number;
    pageSize?: number;
  }
  