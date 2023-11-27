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
    VIDEO: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 10 * 60,
    },
    AUDIO: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 10 * 60,
    },
    IMAGE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 10 * 60,
    },
    TEXT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 10 * 60,
    },
  },
  QUESTION: {
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    COMMENT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    TEXT: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 1,
    },
    ANSWERKEY_TEXT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    ANSWERKEY_MULTIPLECHOICE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 1,
    },
  },
};
