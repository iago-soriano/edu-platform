import { HttpMethod } from "../../interfaces";

export function Post<T extends { new (...args: any[]): {} }>(endpoint: string) {
  return function (constructor: T) {
    return class extends constructor {
      method = HttpMethod.POST;
      path = endpoint;
    };
  };
}
