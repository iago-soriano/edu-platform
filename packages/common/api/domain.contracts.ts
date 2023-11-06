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

//SaveQuestion [PUT activities/{activityId}/questions]
export type SaveQuestionRequestBody = {
  text: string;
  answerKey: string;
  type: string;
  choices?: {
    text: string;
    comment: string;
    label: string;
  }[];
  questionId?: number;
};
export type InsertQuestionResponseBody = {
  questionId?: number;
};

// Save Content [PUT activities/{activityId}/contents]
export type SaveContentRequestBody = {
  title: string;
  content: string;
  description: string;
  type: string;
  contentId?: number;
};

export type SaveContentResponseBody = {
  contentId: number;
};

/* 
--- CRIAR E EDITAR ATIVIDADE ---
(Para a página de realizar atividade)
GetActivity [GET activities/{activityId}]
  vê se existe student-output deste user nesta atividade. Se houver, retornar. 
  pega activity e todos os seus contents
  <- { activity, studentOutput? (lista de answers com seus feedbacks associados) }

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
