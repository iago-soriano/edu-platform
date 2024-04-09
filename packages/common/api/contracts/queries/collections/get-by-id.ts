export type CollectionResponseDTO = {
  name: string;
  description: string;
  isPrivate: boolean;
  notifyOwnerOnStudentOutput: boolean;
};

type Params = { collectionId: number };
type ResponseBody = CollectionResponseDTO;

export {
  ResponseBody as GetCollectionResponseBody,
  Params as GetCollectionParams,
};
