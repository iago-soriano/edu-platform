import { SignInUpInputBuilder } from "../data-builders";
import {
  IUserRepository,
  ITokenRepository,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
  IEmailService,
} from "@interfaces";
import {
  ISignInUseCase,
  ISignOutUseCase,
  ISignUpUseCase,
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
} from "@use-cases";

interface ConstructorParams {
  mockEncryptionService?: Partial<IEncryptionService>;
  mockEmailService?: Partial<IEmailService>;
  mockUserRepository?: Partial<IUserRepository>;
  mockTokenService?: Partial<ITokenService>;
  mockIdGenerator?: Partial<IIdGenerator>;
  mockTokenRepository?: Partial<ITokenRepository>;
}

export class TestDataFacade {
  public inputBuilder: SignInUpInputBuilder;

  public mockEncryptionService: IEncryptionService;
  public mockTokenService: ITokenService;
  public mockUserRepository: IUserRepository;
  public mockIdGenerator: IIdGenerator;
  public mockEmailService: IEmailService;
  public mockTokenRepository: ITokenRepository;

  public sut: {
    signIn: ISignInUseCase;
    signUp: ISignUpUseCase;
    signOut: ISignOutUseCase;
  };

  constructor({
    mockEncryptionService,
    mockUserRepository,
    mockTokenService,
    mockIdGenerator,
    mockEmailService,
    mockTokenRepository,
  }: ConstructorParams) {
    this.mockUserRepository = {
      getUserByEmail: mockUserRepository?.getUserByEmail || jest.fn(),
      getUserById: mockUserRepository?.getUserById || jest.fn(),
      insertUser: mockUserRepository?.insertUser || jest.fn(),
      updateUser: mockUserRepository?.updateUser || jest.fn(),
    };

    this.mockEmailService = {
      sendForgotPasswordEmail:
        mockEmailService?.sendForgotPasswordEmail || jest.fn(),
      sendVerifyAccountEmail:
        mockEmailService?.sendVerifyAccountEmail || jest.fn(),
    };

    this.mockEncryptionService = {
      encrypt: mockEncryptionService?.encrypt || jest.fn(),
      compare: mockEncryptionService?.compare || jest.fn(),
    };

    this.mockIdGenerator = {
      getId: mockIdGenerator?.getId || jest.fn(),
    };

    this.mockTokenService = {
      generate: mockTokenService?.generate || jest.fn(),
      verify: mockTokenService?.verify || jest.fn(),
    };

    this.mockTokenRepository = {
      getTokenByTokenValue:
        mockVerificationTokenRepository?.getTokenByTokenValue || jest.fn(),
      insertToken: mockVerificationTokenRepository?.insertToken || jest.fn(),
    };

    this.inputBuilder = new SignInUpInputBuilder();

    this.sut = {
      signIn: new SignInUseCase(
        this.mockUserRepository,
        this.mockEncryptionService,
        this.mockTokenService
      ),
      signUp: new SignUpUseCase(
        this.mockUserRepository,
        this.mockEncryptionService,
        this.mockIdGenerator,
        this.mockEmailService,
        this.mockVerificationTokenRepository,
        this.mockProfileImageRepository
      ),
      signOut: new SignOutUseCase(this.mockUserRepository),
    };
  }
}
