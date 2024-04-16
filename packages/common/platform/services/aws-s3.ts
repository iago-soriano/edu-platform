import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { IStorageService } from "./interfaces";
import { FileType } from "@edu-platform/common";
import fs from "fs";

export class S3Service implements IStorageService {
  private _s3: S3Client;

  constructor() {
    this._s3 = new S3Client();
  }

  async uploadFile(keyName: string, file: FileType) {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: keyName,
      Body: fs.createReadStream(file.path),
      ACL: "public-read",
    });

    await this._s3.send(command);

    return this._getUrl(keyName);
  }

  _getUrl(keyName: string) {
    return `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${keyName}`;
  }

  async deleteFileByUrl(url: string) {
    const keyName = url.split("/")[3].concat("/", url.split("/")[4]);

    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: keyName,
    });

    try {
      const response = await this._s3.send(command);
    } catch (err) {
      console.error(err);
    }
  }
}
