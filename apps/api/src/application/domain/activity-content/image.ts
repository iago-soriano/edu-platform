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
    let uploadedImage;
    if (newContent.file) {
      uploadedImage = await uploadFunction(); //TODO: fazer isso lançar um erro se o upload não der certo
    }

    // altering a content that belongs to a different version
    if (this.originatingVersionId !== versionId) {
      this.id = undefined;
      this.parentId = newContent.id;
      this.originatingVersionId = versionId;
    } else {
      if (this.imageUrl) await deleteFunction(this.imageUrl);
    }

    this.imageUrl = uploadedImage;
    this.title = newContent.title;
    this.description = newContent.description;
  }

  isEmpty() {
    !this.imageUrl;
  }
}
