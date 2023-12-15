export interface IHTTPClient {
  get: (url: string, query?: { [k: string]: string }) => Promise<any>;
  patch: (
    url: string,
    body: unknown,
    query?: { [k: string]: string }
  ) => Promise<unknown>;
  post: (
    url: string,
    body: unknown,
    query?: { [k: string]: string }
  ) => Promise<unknown>;
  put: (
    url: string,
    body: unknown,
    query?: { [k: string]: string }
  ) => Promise<unknown>;
  setHeader: (header: string, value: string) => void;
}

type HTTPMethod = "post" | "get" | "put" | "patch" | "delete";

export interface HTTPControllerDefinition {
  method: HTTPMethod;
  path: string;
}
export type FieldError = { [field: string]: string };

export type ServerError = {
  status: number;
  message: string;
  errors: FieldError;
};
