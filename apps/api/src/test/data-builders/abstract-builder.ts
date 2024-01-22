export abstract class AbstractBuilder<T> {
  protected data!: T;
  constructor() {
    this.reset();
  }
  abstract reset(): void;
  build() {
    return this.data;
  }
}
