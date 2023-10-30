import { HTTPControllerDefinition } from "./interfaces";

// sign-in
export interface SignInRequestBody {
  email: string;
  password: string;
}
export interface SignInResponseBody {
  token: string;
  user: { email: string; name?: string; image?: string };
}

export type ProviderSignInRequestBody = { email: string; provider: string };
export type ProviderSignInResponseBody = {
  token: string;
  user: { email: string; name?: string; image?: string };
};

// sign-up
export interface SignUpRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
export interface SignUpResponseBody {}

export interface ProviderSignUpRequestBody {
  email: string;
  id: string;
  image: string;
  provider: string;
  name: string;
}
export interface ProviderSignUpResponseBody {}

// sign-out
export interface SignOutRequestBody {}
export interface SignOutResponseBody {}

// verify account
export interface VerifyAccountRequestBody {
  verifyAccountToken: string;
}
export interface VerifyAccountResponseBody {}

// change password request
export interface ChangePasswordRequestRequestBody {
  email: string;
}
export interface ChangePasswordRequestResponseBody {}

// change password
export interface ChangePasswordRequestBody {
  changePasswordToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface ChangePasswordResponseBody {}

// check change password token
export type CheckChangePasswordTokenRequestQueryParams = {
  token: string;
};
export interface CheckChangePasswordTokenResponseBody {
  isValid: boolean;
}

// InsertActivity [POST activities]
// pego o user pelo jwt, crio uma activity com status draft
export type InsertActivityRequestBody = {
  title: string;
  description: string;
  topics: string[];
};
export type InsertActivityResponseBody = {
  activityId: number;
};

// GetTopics [GET topics]
export type GetTopicsRequestBody = {};
export type GetTopicsResponseBody = {
  topics: string[];
};

// Create New Activity [POST activities]
export type CreateNewActivityRequestBody = {
  title: string;
  description: string;
  topics: string[];
};
export type CreateNewActivityResponseBody = {
  activityId: number;
};

/* 
--- CRIAR E EDITAR ATIVIDADE ---
GetTopics [GET topics]
  devolve todos os topics do bd (ou de um enum estático no backend)
  <- {topics[]}

(Obs: no front, apertar botão de criar atividade e entrar na página de criação com os defaults
 para title, descr e topics. Só deixar inserir elements depois de alterar esses valores e 
 apertar em salvar. Esse botão chama este endpoint.)
CreateNewActivity [POST activities]
  -> { title, description, topics }
  cria uma activity 
  <- { activityId }

(Ao inserir um element, usar este endpoint com optimistic update)
InsertElement [PUT activities/{activityId}/elements]
  -> { element }
  pegar a activity do bd
  criar objetos de domínio do element (content ou question)
  - pensar nas validações dos elements
  inserir o element na activity
  <- ok

(Para a página de realizar atividade)
GetActivity [GET activities/{activityId}]
  vê se existe student-output deste user nesta atividade. Se houver, retornar. 
  pega activity e todos os seus contents
  <- { activity, studentOutput? (lista de answers com seus feedbacks associados) }

ChangeActivityStatus [PATCH activities/{activityId}/status]
  -> {status }
  pega activity, valida se ela pertence ao user que está fazendo a requisição
  muda seu status se validações (a determinar) passarem
  <- ok

GetAuthoredActivities [GET activities]
  pega todas as atividades de que esse usuário é autor
  <- { activity[] (sem contents) }

--- FAZER ATIVIDADE E FEEDBACK ---
InsertOutputAnswer [POST output-answer/{questionId}]
  -> { text, studentOutputId?, outputAnswerId? }
  a) { text, studentOutputId }
  b) { text, studentOutputId, outputAnswerId }
  c) { text }

  Se tiver outputAnswerId, tem que ter studentOutputId. Validar isso.
  pegar o activityId relacionada à question
  { studentOutputId }
    validar que stdOtp pertence ao user
    validar que o activityId desse stdOtp é o mesmo da question
    { outputAnswerId }
      edição de resposta já existente
      <- ok
    { !outputAnswerId }
      criação de novo outputAnswer
      <- { outputAnswerId }
  { !studentOutputId }
    criar novo studentOutput para a activity e novo outputAnswer
    <- { studentOutputId, outputAnswerId }

GetStudentOutputsMadeByUser [GET student-outputs]
  pega todos os student-outputs autorados por este usuário
  <- { studentOutputs[] }

(Obs: ao invés disso, pegar sempre activity, com output e feedbacks, e impedir a edição
  de um outputAnswer se já existir feedback)
GetStudentOutput [GET student-outputs/{outputId}]
  pega este student output, assim como toda a atividade e os feedbacks
  <- { activity, studentOutput (lista de answers com seus feedbacks associados)}

(Obs: ter um menu lateral com atividades, e, ao clicar em cada uma, obter os outputs)
GetStudentOutputsOfActivity [GET activity/{activityId}/student-outputs]
  pega todos os student-outputs relacionados a esta atividade
  <- studentOutput[]

InsertFeedback [POST student-outputs/{studentOutputId}/feedback]
*/
