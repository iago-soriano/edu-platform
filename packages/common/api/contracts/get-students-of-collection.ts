type Params = { collectionId: number };
type ResponseBody = { id: number; name: string; email: string }[];

export {
  ResponseBody as GetStudentsOfCollectionResponseBody,
  Params as GetStudentsOfCollectionParams,
};
