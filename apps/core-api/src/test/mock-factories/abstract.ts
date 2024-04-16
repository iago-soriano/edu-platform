export abstract class AbstractMockBuilder<T> {
  public object!: T;
  // constructor() {
  //   this.reset();
  // }
  abstract reset(): void;
}
