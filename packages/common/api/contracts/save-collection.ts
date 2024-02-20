import { CollectionRequestDTO } from "../../dto";

type RequestBody = CollectionRequestDTO;
type ResponseBody = { collectionId: number };
type Params = {};

export {
  RequestBody as SaveCollectionRequestBody,
  ResponseBody as SaveCollectionResponseBody,
  Params as SaveCollectionParams,
};
