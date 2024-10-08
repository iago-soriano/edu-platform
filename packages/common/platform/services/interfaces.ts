import { FileType } from "../interfaces/controllers";
import { JwtPayload as LibJWTPayload } from "jsonwebtoken";
import { DomainEvent } from "../interfaces/domain";

export type JWTPayload = {
  id: string;
  providerId?: string;
};

export interface ITokenService {
  generateRefreshToken: (payload: JWTPayload) => string;
  generateAccessToken: (payload: JWTPayload) => string;
  verifyAccessToken: (token: string) => JWTPayload;
  verifyRefreshToken: (token: string) => JWTPayload;
  decode: (token: string) => LibJWTPayload;
}

export interface ITopicService {
  send: (event: DomainEvent<unknown>, topicArn: string) => Promise<any>;
}

export interface IEncryptionService {
  encrypt: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}

export interface IStorageService {
  uploadFile: (keyName: string, file: FileType) => Promise<string>;
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
  sendVerifyAccountEmail: (
    args: SendEmailArgs & { token: string }
  ) => Promise<any>;
}
