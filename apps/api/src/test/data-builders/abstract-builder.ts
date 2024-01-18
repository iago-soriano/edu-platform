export abstract class AbstractBuilder<T> {
  public data!: T;
  constructor() {
    this.reset();
  }
  abstract reset(): void;
  build() {
    return this.data;
  }
}
