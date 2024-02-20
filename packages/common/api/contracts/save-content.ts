import { ContentRequestDTO } from "../../dto";

type RequestBody = ContentRequestDTO;
type ResponseBody = {
  contentId?: number;
};
type Params = { activityId: string; versionId: string };

export {
  RequestBody as SaveContentRequestBody,
  ResponseBody as SaveContentResponseBody,
  Params as SaveContentParams,
};
