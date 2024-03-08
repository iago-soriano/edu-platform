type ResponseBody = {
  isOwnerOf: {
    id: number;
    name: string;
    updatedAt: Date;
    isPrivate: boolean;
    notifyOwnerOnStudentOutput: boolean;
    draftVersionsCount: number;
  }[];
  participatesIn: {}[];
};
type Query = { byOwnership: boolean };

export {
  ResponseBody as ListCollectionsByUserResponseBody,
  Query as ListCollectionsByUserQuery,
};
