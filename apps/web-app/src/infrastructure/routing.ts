export const Router = {
  editActivity: ({ activityId, versionId }) =>
    `/teacher-area/activity/${activityId}/version/${versionId}/edit`,
  previewActivity: ({ activityId, versionId }) =>
    `/teacher-area/activity/${activityId}/version/${versionId}/preview`,
  editCollection: ({ collectionId }) =>
    `/teacher-area/collections/${collectionId}/edit?ActivityTab=Active`,
  teacherHome: "/teacher-area?activeTab=ActiveActivities",
  studentHome: "/student-area?activeTab=ActiveActivities",
};
