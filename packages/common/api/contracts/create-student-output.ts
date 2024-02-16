import { StudentOutputDTO } from "../../dto";

type RequestBody = StudentOutputDTO;
type ResponseBody = { outputId: number };
type Params = { activityId: number; versionId: number };

export {
  RequestBody as CreateStudentOutputRequestBody,
  ResponseBody as CreateStudentOutputResponseBody,
  Params as CreateStudentOutputParams,
};
