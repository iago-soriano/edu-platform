export class Activity {
  public id!: number;
  public authorId!: number;
  public lastVersionId!: number;
  public draftVersionId!: number;

  hasPublishedVersion() {
    return !!this.lastVersionId;
  }

  hasDraft() {
    return !!this.draftVersionId;
  }
}
