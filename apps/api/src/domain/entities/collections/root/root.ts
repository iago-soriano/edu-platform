import { CollectionName, CollectionDescription } from "../value-objects";
import { CollectionParticipation } from "../participants";
import { Entity, CollectionArray } from "@edu-platform/common/platform";

export class Collection extends Entity {
  public name: CollectionName;
  public description: CollectionDescription;
  public isPrivate: boolean;
  public notifyOwnerOnStudentOutput: boolean;

  public ownerId!: number;
  public participants: CollectionArray<CollectionParticipation> =
    new CollectionArray();

  constructor(
    id?: number,
    name?: string,
    description?: string,
    isPrivate?: boolean,
    notifyOwnerOnStudentOutput?: boolean
  ) {
    super();
    this.id = id || 0;
    this.name = new CollectionName(name || "");
    this.description = new CollectionDescription(description || "");
    this.isPrivate = isPrivate || true;
    this.notifyOwnerOnStudentOutput = notifyOwnerOnStudentOutput || true;
  }

  upsert(
    user: { id: number },
    newValues: {
      name?: string;
      description?: string;
      isPrivate?: boolean;
      notifyOwnerOnStudentOutput?: boolean;
    }
  ) {
    if (newValues.description) {
      this.description = new CollectionDescription(newValues.description);
      this.description.validate();
    }
    if (newValues.name) {
      this.name = new CollectionName(newValues.name);
      this.name.validate();
    }
    if (newValues.isPrivate !== undefined) this.isPrivate = newValues.isPrivate;
    if (newValues.notifyOwnerOnStudentOutput !== undefined)
      this.notifyOwnerOnStudentOutput = newValues.notifyOwnerOnStudentOutput;
  }
}
