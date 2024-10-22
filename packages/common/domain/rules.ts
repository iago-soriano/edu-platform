export const DomainRules = {
  FEEDBACK: {
    MAX_LENGTH: 500, // in characters
  },
  ANSWER: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100,
  },
  ACTIVITY_BLOCKS: {
    TEXT: {
      MIN_LENGTH: 100,
      MAX_LENGTH: 5000,
    },
    OPEN_QUESTION: {
      MIN_LENGTH_CHARACTERS: 30,
      MAX_LENGTH_CHARACTERS: 300,
    },
    MULTIPLE_CHOICE_QUESTION: {
      QUESTION: {
        MIN_LENGTH_CHARACTERS: 30,
        MAX_LENGTH_CHARACTERS: 300,
      },
      ALTERNATIVE: {
        MIN_LENGTH_CHARACTERS: 2,
        MAX_LENGTH_CHARACTERS: 300,
      },
    },
  },
};
