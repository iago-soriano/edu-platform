import { CollectionName, CollectionDescription } from "../value-objects";
import { CollectionParticipation, ParticipationType } from "../participants";
import { Entity, CollectionArray } from "@edu-platform/common/platform";
import {
  InvalidStateError,
  SilentInvalidStateError,
} from "@edu-platform/common";

export class Collection extends Entity {
  public id: number;
  public name: CollectionName;
  public description: CollectionDescription;
  public isPrivate: boolean;
  public notifyOwnerOnStudentOutput: boolean;

  public ownerId!: string;
  public participants: CollectionArray<CollectionParticipation> =
    new CollectionArray();

  constructor(
    id?: number,
    name?: string,
    description?: string,
    isPrivate?: boolean,
    notifyOwnerOnStudentOutput?: boolean,
    ownerId?: string
  ) {
    super();
    this.id = id || 0;
    this.name = new CollectionName(name || "");
    this.description = new CollectionDescription(description || "");
    this.isPrivate = isPrivate || true;
    this.notifyOwnerOnStudentOutput = notifyOwnerOnStudentOutput || true;
    this.ownerId = ownerId || "0";
  }

  updateMetadata(
    user: { id: string },
    newValues: {
      name?: string;
      description?: string;
      isPrivate?: boolean;
      notifyOwnerOnStudentOutput?: boolean;
    }
  ) {
    if (user.id !== this.ownerId)
      throw new SilentInvalidStateError("User is not owner");

    if (newValues.description !== undefined) {
      this.description = new CollectionDescription(newValues.description);
      this.description.validate();
    }
    if (newValues.name !== undefined) {
      this.name = new CollectionName(newValues.name);
      this.name.validate();
    }
    if (newValues.isPrivate !== undefined) {
      this.isPrivate = newValues.isPrivate;
    }
    if (newValues.notifyOwnerOnStudentOutput !== undefined)
      this.notifyOwnerOnStudentOutput = newValues.notifyOwnerOnStudentOutput;
  }

  insertStudent(user: { id: string }, student: { id: string }) {
    if (user.id !== this.ownerId)
      throw new SilentInvalidStateError("User is not owner");

    if (!this.isPrivate) throw new SilentInvalidStateError("Public collection");

    if (this.participants.length >= 10)
      throw new InvalidStateError("Max number of participants reached");

    const newParticipant = new CollectionParticipation(
      student.id,
      this.id,
      ParticipationType.Student
    );

    this.participants.push(newParticipant);
  }

  removeStudent(user: { id: string }, participationId: number) {
    if (user.id !== this.ownerId)
      throw new SilentInvalidStateError("User is not owner");

    this.participants.markAsDeletedById(participationId);
  }

  insertFollower(user: { id: string }) {
    if (this.isPrivate) throw new SilentInvalidStateError("Private collection");

    const newParticipant = new CollectionParticipation(
      user.id,
      this.id,
      ParticipationType.Follower
    );

    this.participants.push(newParticipant);
  }

  removeFollower(participationId: number, user: { id: string }) {
    const participationToDelete = this.participants.filter(
      (part) => part.id === participationId
    )[0];

    if (!participationToDelete)
      throw new SilentInvalidStateError("Participation not found by id");
    if (participationToDelete.type !== ParticipationType.Follower)
      throw new SilentInvalidStateError("This user is not a follower");
    if (participationToDelete.userId !== user.id)
      throw new SilentInvalidStateError("Cannot remove that participation");

    this.participants.markAsDeletedById(participationId);
  }
}
