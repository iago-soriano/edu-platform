import { expect } from "@jest/globals";
import { toThrowFieldError } from "./custom-error";

expect.extend({
  toThrowFieldError,
});
