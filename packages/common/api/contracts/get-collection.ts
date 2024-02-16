import { CollectionDTO } from "../../dto";

type Params = { collectionId: number };
type ResponseBody = CollectionDTO;

export {
  ResponseBody as GetCollectionResponseBody,
  Params as GetCollectionParams,
};
