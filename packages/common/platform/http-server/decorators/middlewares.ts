export function Middlewares<T extends { new (...args: any[]): {} }>(
  newMiddlewares: string[]
) {
  return function (constructor: T) {
    return class extends constructor {
      // middlewares.push(newMiddlewares)
      middlewares = newMiddlewares;
    };
  };
}
