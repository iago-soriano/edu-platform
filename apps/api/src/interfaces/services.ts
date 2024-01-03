import { FileType } from "./controller";
import { JwtPayload as LibJWTPayload } from "jsonwebtoken";

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

export interface IIdGenerator {
  getId: () => string;
}

export interface IEncryptionService {
  encrypt: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}

export interface IStorageService {
  uploadFile: (keyName: string, file: FileType) => Promise<string>;
  deleteFile: (url: string) => Promise<void>;
}

export interface IAssetRepository {
  getGenericImageUrl: () => string;
}

type SendEmailArgs = {
  destination: string;
  url: string;
};
export interface IEmailService {
  sendForgotPasswordEmail: (args: SendEmailArgs) => Promise<any>;
  sendVerifyAccountEmail: (args: SendEmailArgs) => Promise<any>;
}
