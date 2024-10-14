import { FileType } from "../interfaces/controllers";
import { JwtPayload as LibJWTPayload } from "jsonwebtoken";
import { DomainEvent } from "../interfaces/domain";

export type JWTPayload = {
  id: string;
  providerId?: string;
};

export interface ITokenService {
  verify: (
    token: string,
    issuer: string,
    publicKey: string
  ) => { userEmail: string };
}

export interface ITopicService {
  send: (event: DomainEvent<unknown>, topicArn: string) => Promise<any>;
}

export interface ISQSService {
  send: (event: DomainEvent<unknown>) => Promise<any>;
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

export interface IEmailService {
  sendActivityLinkToStudent: (studentEmail: string) => Promise<any>;
  sendStudentOutputLinkToTeacher: (requestingUserEmail: string) => Promise<any>;
  sendOutputReviewToStudent: (studentEmail: string) => Promise<any>;
}

export interface IKeycloakAdmin {
  createUser(
    username: string,
    email: string,
    password: string
  ): Promise<{ id: string }>;
}
