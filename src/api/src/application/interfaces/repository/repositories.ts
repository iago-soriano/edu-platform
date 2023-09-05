import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  UserDTO,
  StudentOutputDTO,
  InstructorDTO,
  StudentDTO,
  AssociationInvitationTokenDTO,
  VerificationTokenDTO,
  ForgotPasswordTokenDTO
} from "..";



export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | null>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  insertUser: (user: UserDTO) => Promise<UserDTO>;
  updateUser: (id: string, user: Partial<UserDTO>) => Promise<UserDTO>;
}


export interface IAssociationInvitationRepository {
  getTokenByTokenValue: (
    token: string
  ) => Promise<
    AssociationInvitationTokenDTO & {
      instructor: Partial<InstructorDTO | { user: Partial<UserDTO> }>;
    }
  >;
  insertToken: (
    token: AssociationInvitationTokenDTO
  ) => Promise<AssociationInvitationTokenDTO>;
  updateToken: (
    tokenId: string,
    data: Partial<AssociationInvitationTokenDTO>
  ) => Promise<AssociationInvitationTokenDTO>;
  getTokenByStudentAndInstructorIds: (
    instructorId: string,
    studentId: string
  ) => Promise<AssociationInvitationTokenDTO>;
  getTokenByStudentId: (
    instructorId: string
  ) => Promise<AssociationInvitationTokenDTO>;
  removeAssociationByStudentId: (studentId: string) => Promise<any>;
}

export interface IVerificationTokenRepository {
  getTokenByTokenValue: (token: string) => Promise<VerificationTokenDTO | null>;
  insertToken: (token: VerificationTokenDTO) => Promise<VerificationTokenDTO>;
}

export interface IForgotPasswordTokenRepository {
  getTokenByTokenValue: (
    token: string
  ) => Promise<ForgotPasswordTokenDTO | null>;
  insertToken: (
    token: ForgotPasswordTokenDTO
  ) => Promise<ForgotPasswordTokenDTO>;
  updateToken: (
    id: string,
    data: Partial<ForgotPasswordTokenDTO>
  ) => Promise<ForgotPasswordTokenDTO>;
}

export interface IProfileImageRepository {
  uploadProfileImage: (file: any, userId: string) => Promise<string>;
  getGenericImageUrl: () => string;
}
