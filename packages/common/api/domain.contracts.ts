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
