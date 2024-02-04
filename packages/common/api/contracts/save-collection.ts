import { CollectionDTO } from "../../dto";

type RequestBody = CollectionDTO;
type ResponseBody = { collectionId: number };
type Params = {};

export {
  RequestBody as SaveCollectionRequestBody,
  ResponseBody as SaveCollectionResponseBody,
  Params as SaveCollectionParams,
};
