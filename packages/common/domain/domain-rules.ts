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
    MAX_VIDEO_LENGTH: 10 * 60, // in seconds. 10 min max
    MAX_TEXT_LENGTH: 10000, // in characters
  },
  FEEDBACK: {
    MAX_LENGTH: 500, // in characters
  },
};
