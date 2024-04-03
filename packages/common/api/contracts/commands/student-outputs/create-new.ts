import { StudentOutputRequestDTO } from "../../../../dto";

type RequestBody = StudentOutputRequestDTO;
type ResponseBody = { outputId: number };
type Params = { activityId: number; versionId: number };

export {
  RequestBody as CreateStudentOutputRequestBody,
  ResponseBody as CreateStudentOutputResponseBody,
  Params as CreateStudentOutputParams,
};
