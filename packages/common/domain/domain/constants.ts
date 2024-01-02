export const ActivityConstants = {
  STATUS: {
    DRAFT: "Draft",
    PUBLISHED: "Published",
    ARCHIVED: "Archived",
  },
  contentPossibleTypes: ["Video", "Image", "Text"] as const,
  VIDEO: {
    TRACKS_MAX_NUM: 10,
  },
};
