export type JWTPayload = {
  tokenVersion: number;
  id?: number;
  providerId?: string;
};

export interface ITokenService {
  generate: (payload: JWTPayload) => string;
  verify: (token: string) => Promise<JWTPayload>;
}

export interface IIdGenerator {
  getId: () => string;
}

export interface IEncryptionService {
  encrypt: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}

// export interface IStorageService {
//   uploadFile: (
//     file: any,
//     fileName: string,
//     bucketName: string
//   ) => Promise<boolean>;
// }
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
