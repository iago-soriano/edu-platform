export const DomainRules = {
  ACTIVITY: {
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    DESCRIPTION: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 400,
    },
    TOPICS: {
      MAX_COUNT: 5,
    },
  },
  FEEDBACK: {
    MAX_LENGTH: 500, // in characters
  },
  CONTENT: {
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    DESCRIPTION: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 400,
    },
    MAX_VIDEO_LENGTH: 10 * 60,
  },
};
