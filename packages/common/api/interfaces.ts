export interface IHTTPClient {
  get: (url: string) => Promise<any>;
  post: (url: string, body: unknown) => Promise<unknown>;
  put: (url: string, body: unknown) => Promise<unknown>;
  delete: (url: string) => Promise<unknown>;
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
