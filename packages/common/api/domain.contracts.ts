// create new activity and version
export type CreateNewActivityRequestBody = {};
export type CreateNewActivityResponseBody = {
  activityId?: number;
  versionId?: number;
};

// get all activities authored by the user by statuses
export type GetActivityVersionsResponseBody = {
  title: string;
  description: string;
  status: string;
  updatedAt: Date;
  id: number;
  activityId: number;
}[];

// UpdateActivityMetadata [POST activity/${activityId}/update-activity-metadata/${versionId}]
export type UpdateActivityVersionMetadataRequestBody = {
  activityId: number;
  title?: string;
  description?: string;
  topics?: string;
};
export type UpdateActivityVersionMetadataResponseBody = {
  activityId: number;
};
export type UpdateActivityVersionMetadataRequestParams = {
  activityId: string;
  versionId: string;
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
  order?: number;
};
export type SaveQuestionResponseBody = {
  questionId?: number;
};

// POST update-activity/${activityId}/version/${versionId}/status
export type UpdateActivityStatusRequestParams = {
  activityId: string;
  versionId: string;
};
export type UpdateActivityStatusRequestBody = {
  newActivityStatus: string;
};
export type UpdateActivityStatusResponseBody = {
  lastPublishedVersion?: number;
};

// DELETE activity/${activityId}/version/${versionId}/content/${contentId}
export type DeleteActivityContentParams = {
  activityId: string;
  versionId: string;
  contentId: string;
};

// DELETE activity/${activityId}/version/${versionId}
export type DeleteDraftVersionParams = {
  activityId: string;
  versionId: string;
};

//POST  create-new-version/:activityId.  flag forceCreate
export type CreateNewActivityVersionParams = {
  activityId: string;
};

export type CreateNewActivityVersionResponseBody = {
  versionId: number;
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
