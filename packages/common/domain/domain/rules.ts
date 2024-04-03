export const DomainRules = {
  FEEDBACK: {
    MAX_LENGTH: 500, // in characters
  },
  CONTENT: {
    TITLE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 50,
    },
    DESCRIPTION: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 200,
    },
    VIDEO: {
      TRACKS_MAX_NUM: 10,
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
    CHOICE_COMMENT_TEXT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    QUESTION_TEXT: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 1,
    },
    SUGGESTED_ANSWER_TEXT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
  },
};
