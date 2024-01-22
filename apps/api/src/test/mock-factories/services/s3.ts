import { AbstractMockBuilder } from "../abstract";
import { IStorageService } from "@interfaces";

export class S3ServiceMockBuilder extends AbstractMockBuilder<IStorageService> {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.object = {
      uploadFile: jest.fn().mockResolvedValue("url"),
      deleteFileByUrl: jest.fn(),
    };
  }
}
