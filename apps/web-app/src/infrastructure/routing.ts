export const Router = {
  editActivity: ({ activityId }) => `/teacher-area/activity/${activityId}/edit`,
  previewDraft: ({ activityId }) =>
    `/teacher-area/activity/${activityId}/preview-draft`,
  previewActivityDraft: ({ activityId }) =>
    `/teacher-area/activity/${activityId}/version/preview-draft`,
  collectionSettings: (collectionId) =>
    `/teacher-area/collections/${collectionId}/edit/settings`,
  collectionActivities: (collectionId) =>
    `/teacher-area/collections/${collectionId}/edit/activities`,
  collectionStudents: (collectionId) =>
    `/teacher-area/collections/${collectionId}/edit/students`,
  teacherBaseRoute: "/teacher-area/dashboard/collections",
  teacherPrivateCollections:
    "/teacher-area/dashboard/collections/private?page=0",
  teacherPublicCollections: "/teacher-area/dashboard/collections/public?page=0",
  teacherActivities: "/teacher-area/dashboard/activities",
  teacherStudentOutputs: "/teacher-area/dashboard/student-outputs",

  studentHome: "/student-area",
};
