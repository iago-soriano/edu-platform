// GetTopics [GET topics]
// devolve todos os topics do bd
export type GetTopicsRequestBody = {};
export type GetTopicsResponseBody = {
  topics: { id: number; label: string }[];
};

// SaveActivity [POST activities]
/*
(Obs: no front, apertar botão de criar atividade e entrar na página de criação com os defaults
 para title, descr e topics. Esse botão chama este endpoint. 
Obs2: no front, no onBlur de cada alteração)
 /* 
- se for informado um activityId, obter a activity
- obtenho do db os topics informados pelo id
- crio uma activity a partir do objeto de domínio
- insiro activity no db
*/
export type SaveActivityRequestBody = {
  title: string;
  description: string;
  topicIds: number[];
  activityId?: number;
};
export type SaveActivityResponseBody = {
  activityId?: number;
  versionId?: number;
};

//InsertQuestion [PUT activities/{activityId}/questions]
/**
  pegar a activity do bd
  criar objeto da question
  inserir a question na activity
 */
export type InsertQuestionRequestBody = {
  text: string;
  answerKey: string;
  type: string;
  choices?: {
    text: string;
    comment: string;
    label: string;
  }[];
};
export type InsertQuestionResponseBody = {
  questionId: number;
};

// Insert Content [PUT activities/{activityId}/contents]
export type InsertContentRequestBody = {
  title: string;
  content: string;
  description: string;
  type: string;
};

export type InsertContentResponseBody = {
  contentId: number;
};
/* 
--- CRIAR E EDITAR ATIVIDADE ---


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
