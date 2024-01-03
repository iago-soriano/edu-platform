import { FileType } from "@interfaces";
import { Content, ContentTypesType } from "./base";

export class ImageContent extends Content {
  constructor(
    public type: ContentTypesType,
    public id: number,
    public title: string,
    public description: string,
    public file: FileType,
    public imageUrl: string,
    public order: number,
    public originatingVersionId: number,
    public parentId: number
  ) {
    super(type, id, title, description, order, originatingVersionId, parentId);
  }

  async merge(
    versionId: number,
    newContent: Partial<Content> & { file?: FileType; url?: string },
    uploadFunction: () => Promise<string>,
    deleteFunction: (url) => Promise<void>
  ) {
    // altering a content that belongs to a different version
    if (this.originatingVersionId !== versionId) {
      if (newContent.file) {
        const uploadedImage = await uploadFunction();
        this.imageUrl = uploadedImage;
      }
      this.id = undefined;
      this.title = newContent.title;
      this.description = newContent.description;
      this.parentId = newContent.id;
      this.originatingVersionId = versionId;
    } else {
      this.title = newContent.title;
      this.description = newContent.description;
      if (newContent.file) {
        if (this.imageUrl) await deleteFunction(this.imageUrl);
        const uploadedImage = await uploadFunction();
        this.imageUrl = uploadedImage;
      }
    }
  }
}
