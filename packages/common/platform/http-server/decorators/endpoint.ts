import { HttpMethod } from "../../interfaces";

export function Post<T extends { new (...args: any[]): {} }>(endpoint: string) {
  return function(constructor: T) {
    return class extends constructor {
      method = HttpMethod.POST;
      path = endpoint;
    };
  };
}

export function Put<T extends { new (...args: any[]): {} }>(endpoint: string) {
  return function(constructor: T) {
    return class extends constructor {
      method = HttpMethod.PUT;
      path = endpoint;
    };
  };
}

export function Patch<T extends { new (...args: any[]): {} }>(
  endpoint: string,
) {
  return function(constructor: T) {
    return class extends constructor {
      method = HttpMethod.PATCH;
      path = endpoint;
    };
  };
}

export function Get<T extends { new (...args: any[]): {} }>(endpoint: string) {
  return function(constructor: T) {
    return class extends constructor {
      method = HttpMethod.GET;
      path = endpoint;
    };
  };
}

export function Delete<T extends { new (...args: any[]): {} }>(
  endpoint: string,
) {
  return function(constructor: T) {
    return class extends constructor {
      method = HttpMethod.DELETE;
      path = endpoint;
    };
  };
}
