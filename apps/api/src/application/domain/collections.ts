import { User } from ".";

export class Collection {
  public id: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  public name?: string;
  public description?: string;
  public owner!: User;
  public isPrivate?: boolean;
  public notifyOwnerOnStudentOutput?: boolean;

  constructor(id: number) {
    this.id = id;
  }

  merge(newCollection: Collection) {
    if (newCollection.description) {
      this.description = newCollection.description;
      this.validateDescription();
    }
    if (newCollection.name) {
      this.name = newCollection.name;
      this.validateName();
    }
    if (newCollection.isPrivate !== undefined)
      this.isPrivate = newCollection.isPrivate;
    if (newCollection.notifyOwnerOnStudentOutput !== undefined)
      this.notifyOwnerOnStudentOutput =
        newCollection.notifyOwnerOnStudentOutput;
  }
  validateName() {
    if (!this.name) return;
    if (this.name.length > 100) {
      throw new Error("Collection name is too long");
    }
  }

  validateDescription() {
    if (!this.description) return;
    if (this.description.length > 100) {
      throw new Error("Collection description is too long");
    }
  }
}
