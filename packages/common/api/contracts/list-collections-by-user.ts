import { CollectionDTO } from "../../dto";

type RequestBody = {};
type ResponseBody = {
  isOwnerOf: CollectionDTO[] | undefined;
  participatesIn: CollectionDTO[] | undefined;
};
type Params = {};

export {
  RequestBody as ListCollectionsByUserRequestBody,
  ResponseBody as ListCollectionsByUserResponseBody,
  Params as ListCollectionsByUserParams,
};
