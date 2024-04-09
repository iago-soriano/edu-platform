import { Collection } from "@domain";
import { IActivitiesFactory } from "../factories";
import { ActivityVersion, BaseElement, VersionStatus } from "..";
import { IIdGenerator } from "@interfaces";
import { ContentRequestDTO } from "@edu-platform/common";
import {
  Entity,
  CollectionArray,
  PersistancePropertyName,
} from "../../abstract";

export class Activity extends Entity {
  constructor() {
    super();
  }

  public id!: string;
  public authorId!: number;
  public collectionId!: number;
  @PersistancePropertyName("lastVersionId")
  public lastVersion: ActivityVersion | null = null;
  @PersistancePropertyName("draftVersionId")
  public draftVersion: ActivityVersion | null = null;
  public archivedVersions: ActivityVersion[] = [];

  public updateCurrentDraftMetadata(
    newValues: { title?: string; description?: string; topics?: string },
    user: { id: number }
  ) {
    if (!this.draftVersion)
      throw new Error("There is currently no draft to update");

    if (this.authorId !== user.id) throw new Error("Activity not found");

    this.draftVersion.updateMetadata(newValues);
  }

  public setDraftVersion(newVersion: ActivityVersion | null) {
    if (newVersion) newVersion.activityId = this.id;
    this.draftVersion = newVersion;
  }

  public setLastVersion(newVersion: ActivityVersion | null) {
    if (newVersion) newVersion.activityId = this.id;
    this.lastVersion = newVersion;
  }

  public throwIfCantCreateNewDraft(user: { id: number }) {
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");
    if (!this.lastVersion)
      throw new Error(
        "There is no currently published version to create a draft from"
      );

    if (this.draftVersion) throw new Error("There is already a draft");
  }

  public deleteElementOfDraft(user: { id: number }, id: number) {
    if (!this.draftVersion) throw new Error("There is no draft version");
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    return this.draftVersion.deleteElement(id);
  }

  public publishCurrentDraft(user: { id: number }) {
    if (!this.draftVersion)
      throw new Error("There is currently no draft to publish");
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    if (this.lastVersion) {
      this.lastVersion.archive();
      this.archivedVersions.push(this.lastVersion);
    }

    this.draftVersion.publish();

    this.setLastVersion(this.draftVersion);
    this.setDraftVersion(null);
  }

  public upsertContent(user: { id: number }, contentDto: ContentRequestDTO) {
    if (this.authorId !== user.id)
      throw new Error("You are not allowed to change this activity");

    if (!this.draftVersion)
      throw new Error("There is currently no draft to insert contents in");

    this.draftVersion.upsertContent(contentDto);
  }
}
