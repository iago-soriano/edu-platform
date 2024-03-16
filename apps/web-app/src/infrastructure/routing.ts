export const Router = {
  editActivity: ({ activityId, versionId }) =>
    `/teacher-area/activity/${activityId}/version/${versionId}/edit`,
  previewActivity: ({ activityId, versionId }) =>
    `/teacher-area/activity/${activityId}/version/${versionId}/preview`,
  editCollection: (collectionId) =>
    `/teacher-area/collections/${collectionId}/edit/settings`,
  teacherHome: "/teacher-area/dashboard",
  studentHome: "/student-area",
};
