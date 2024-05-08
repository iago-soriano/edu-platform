const all = ["collections"] as const;
const lists = [...all, "list"] as const;
const details = [...all, "detail"] as const;

export const queryKeys = {
  teacherList: (args: { page: number; isPrivate: boolean }) =>
    [...all, "teacher-list", args] as const,
  // teacherPublicList: (pagination: { page: number; pageSize: number }) =>
  //   [...lists, false, pagination] as const,
  studentList: (pagination: { page: number }) =>
    [...all, "student-list", pagination] as const,
  detail: (id: any) => [...details, id] as const,
  participants: (collectionId: any) =>
    [...queryKeys.detail(collectionId), "participants"] as const,
};
