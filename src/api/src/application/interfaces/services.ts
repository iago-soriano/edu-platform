export interface ITokenService {
  generate: (payload: any) => string;
  verify: (token: string) => Promise<any>;
}

export interface IIdGenerator {
  getId: () => string;
}

export interface IEncryptionService {
  encrypt: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}

type EmailBody = {
  text?: string;
  html?: string;
};

export interface IStorageService {
  uploadFile: (
    file: any,
    fileName: string,
    bucketName: string
  ) => Promise<boolean>;
}

type SendEmailArgs = {
  destination: string;
  url: string;
};
export interface IEmailService {
  sendForgotPasswordEmail: (args: SendEmailArgs) => Promise<any>;
  sendVerifyAccountEmail: (args: SendEmailArgs) => Promise<any>;
}