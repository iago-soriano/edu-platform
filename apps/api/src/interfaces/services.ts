import { FileType } from "./controller";
import { JwtPayload as LibJWTPayload } from "jsonwebtoken";
import { DomainEvent } from "@domain";

export type JWTPayload = {
  id: string;
  providerId?: string;
};

export interface ITokenService {
  generateRefreshToken: (payload: JWTPayload) => string;
  generateAccessToken: (payload: JWTPayload) => string;
  verifyAccessToken: (token: string) => { id: string };
  verifyRefreshToken: (token: string) => { id: string };
  decode: (token: string) => LibJWTPayload;
}

export interface ITopicService {
  send: (event: DomainEvent, topicArn: string) => Promise<any>;
}

export interface IEncryptionService {
  encrypt: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}

export interface IStorageService {
  uploadFile: (
    keyName: string,
    file: FileType | null
  ) => Promise<string | undefined>;
  deleteFileByUrl: (url: string) => Promise<void>;
}

export interface IAssetRepository {
  getGenericImageUrl: () => string;
}

type SendEmailArgs = {
  destination: string;
};
export interface IEmailService {
  sendForgotPasswordEmail: (args: SendEmailArgs) => Promise<any>;
  sendVerifyAccountEmail: (args: SendEmailArgs) => Promise<any>;
  sendStudentOutputCompletedEmail: (
    args: SendEmailArgs & {
      studentOutputId: number;
      studentName: string;
      activityTitle: string;
    }
  ) => Promise<any>;
}
