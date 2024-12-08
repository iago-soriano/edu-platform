declare module 'expect' {
  interface AsymmetricMatchers {
    toThrowFieldError(field: string, errorMessage: string): void;
  }
  interface Matchers<R> {
    toThrowFieldError(field: string, errorMessage: string): R;
  }
}
