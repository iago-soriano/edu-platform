export const DomainRules = {
  FEEDBACK: {
    MAX_LENGTH: 500, // in characters
  },
  ANSWER: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
  TITLE: {
    MIN_LENGTH_WORDS: 50,
    MAX_LENGTH_WORDS: 100,
  },
  ACTIVITY_BLOCKS: {
    TEXT: {
      MIN_LENGTH_WORDS: 100,
      MAX_LENGTH_WORDS: 300,
    },
    OPEN_QUESTION: {
      MIN_LENGTH_CHARACTERS: 50,
      MAX_LENGTH_CHARACTERS: 300,
    },
    MULTIPLE_CHOICE_QUESTION: {
      QUESTION: {
        MIN_LENGTH_CHARACTERS: 50,
        MAX_LENGTH_CHARACTERS: 300,
      },
      ALTERNATIVE: {
        MIN_LENGTH_CHARACTERS: 50,
        MAX_LENGTH_CHARACTERS: 300,
      },
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
