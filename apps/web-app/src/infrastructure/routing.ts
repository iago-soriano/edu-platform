export const Router = {
  editActivity: ({ activityId, versionId }) =>
    `/teacher-area/activity/${activityId}/version/${versionId}/edit`,
  previewActivity: ({ activityId, versionId }) =>
    `/teacher-area/activity/${activityId}/version/${versionId}/preview`,
  editCollection: (collectionId) =>
    `/teacher-area/collections/${collectionId}/edit/settings`,
  teacherHome: "/teacher-area/dashboard/collections",
  teacherCollections: "/teacher-area/dashboard/collections",
  teacherActivities: "/teacher-area/dashboard/activities",
  teacherStudentOutputs: "/teacher-area/dashboard/student-outputs",

  studentHome: "/student-area",
};
