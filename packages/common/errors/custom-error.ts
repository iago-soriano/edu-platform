export abstract class CustomError extends Error {
  abstract HTTPstatusCode?: number;
  constructor(
    message: string,
    public realReason: string = undefined
  ) {
    super(message);
  }
}
