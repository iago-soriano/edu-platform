import { CollectionResponseDTO } from "../../dto";

type RequestBody = {};
type ResponseBody = {
  isOwnerOf: CollectionResponseDTO[] | undefined;
  participatesIn: CollectionResponseDTO[] | undefined;
};
type Params = {};

export {
  RequestBody as ListCollectionsByUserRequestBody,
  ResponseBody as ListCollectionsByUserResponseBody,
  Params as ListCollectionsByUserParams,
};
