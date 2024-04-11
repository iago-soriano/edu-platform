import { Entity } from "application/domain/abstract";
import { ActivitElementDescription } from "../elements/value-objects/description";

export abstract class BaseElement extends Entity {
  public order?: number;
  public versionId!: string;
  public description?: ActivitElementDescription;

  constructor(public elementType: string) {
    super();
  }

  /**
   * If empty, it can be deleted from a version that is being published
   */
  public abstract isEmpty(): boolean;

  /**
   * Checks if the content can be published as is
   */
  public abstract checkValidityForPublication(): boolean;

  /**
   * validates all information of a new element being created
   */
  public abstract validateSelf(): void;

  /**
   * Update = merge + validate. Receives some DTO and updates the entity
   */
  public abstract update(
    args: unknown,
    activityId?: string,
    versionId?: string
  ): void;
}
