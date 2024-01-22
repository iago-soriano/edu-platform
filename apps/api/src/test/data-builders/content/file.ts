import { Readable } from "stream";
import { AbstractBuilder } from "../abstract-builder";

export class FileDataBuilder extends AbstractBuilder<Express.Multer.File> {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.data = {
      fieldname: "fgdfgd",
      originalname: "cgdfgfdhh",
      encoding: "cgdfsggdsfgds",
      mimetype: "dsfgfdgds",
      stream: new Readable(),
      destination: "fdsgfdgdg",
      size: 1234,
      filename: "dfggfd",
      path: "dsggfdgds",
      buffer: Buffer.from("fsdfsdf"),
    };
  }
}
