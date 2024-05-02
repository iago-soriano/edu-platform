type RequestBody = {
  newOutputStatus: string;
};
type ResponseBody = { statusWasChanged: boolean };
type Params = {
  studentOutputId: string;
};

export type {
  RequestBody as UpdateStudentOutputRequestBody,
  ResponseBody as UpdateStudentOutputResponseBody,
  Params as UpdateStudentOutputParams,
};
