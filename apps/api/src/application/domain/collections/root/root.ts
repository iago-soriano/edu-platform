import { CollectionName, CollectionDescription } from "../value-objects";
import { Entity, CollectionArray } from "../../abstract";

export class Collection extends Entity {
  public name: CollectionName;
  public description: CollectionDescription;
  public isPrivate: boolean;
  public notifyOwnerOnStudentOutput: boolean;

  public ownerId!: number;
  // TODO: participants

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

  merge(newCollection: Collection) {
    if (newCollection.description) {
      this.description = newCollection.description;
      // this.validateDescription();
    }
    if (newCollection.name) {
      this.name = newCollection.name;
      // this.validateName();
    }
    if (newCollection.isPrivate !== undefined)
      this.isPrivate = newCollection.isPrivate;
    if (newCollection.notifyOwnerOnStudentOutput !== undefined)
      this.notifyOwnerOnStudentOutput =
        newCollection.notifyOwnerOnStudentOutput;
  }

  upsert(
    user: { id: number },
    newValues: { name?: string; description?: string }
  ) {}
}
