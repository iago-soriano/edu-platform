import { Entity } from "application/domain/abstract";
import { ActivitElementDescription } from "../elements/value-objects/description";

export abstract class BaseElement extends Entity {
  public order?: number;
  public versionId!: string;
  public description?: ActivitElementDescription;

  constructor(public elementType: string) {
    super();
  }

  abstract storedFileUrl(): string | null;
  abstract isEmpty(): boolean;
  abstract checkValidityForPublication(): boolean;

  // copyPropertiesAndMethods(source: BaseElement, target: BaseElement) {
  //   const props = Object.getOwnPropertyNames(source);

  //   props.forEach((prop) => {
  //     const descriptor = Object.getOwnPropertyDescriptor(source, prop);
  //     Object.defineProperty(target, prop, descriptor!);
  //   });
  // }
  // abstract copy(): BaseElement;
}
