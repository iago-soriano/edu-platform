import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { IStorageService, FileType } from "@interfaces";
import fs from "fs";

export class S3Service implements IStorageService {
  private _s3: S3Client;

  constructor() {
    this._s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });
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
}
