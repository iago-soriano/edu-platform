import { CollectionResponseDTO } from "../../dto";

type Params = { collectionId: number };
type ResponseBody = CollectionResponseDTO;

export {
  ResponseBody as GetCollectionResponseBody,
  Params as GetCollectionParams,
};
