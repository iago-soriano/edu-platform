// import { expect } from "@jest/globals";
import type { MatcherFunction } from "expect";
import { CustomError } from "@edu-platform/common";

export const toThrowFieldError: MatcherFunction<
  [field: string, errorMessage: string]
> =
  // `floor` and `ceiling` get types from the line above
  // it is recommended to type them as `unknown` and to validate the values
  function (func: any, field, errorMessage) {
    try {
      func();
      return {
        message: () => "Function did not throw an error",
        pass: false,
      };
    } catch (e) {
      if (!(e instanceof CustomError)) {
        return {
          message: () => `Thrown error is not a CustomError`,
          pass: false,
        };
      }
      if (!(e as CustomError).errors[field]) {
        return {
          message: () => `Returned CustomError.errors has no property ${field}`,
          pass: false,
        };
      }
      if ((e as CustomError).errors[field] == errorMessage) {
        return {
          message: () => "",
          pass: true,
        };
      }

      return {
        message: () =>
          `Expected ${this.utils.printExpected(
            errorMessage
          )}\n Received ${this.utils.printReceived(
            (e as CustomError).errors[field]
          )}`,
        pass: false,
      };
    }
  };
