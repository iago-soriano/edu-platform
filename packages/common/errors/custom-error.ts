export abstract class CustomError extends Error {
  abstract HTTPstatusCode?: number;
  constructor(message: string) {
    super(message);
  }
}
