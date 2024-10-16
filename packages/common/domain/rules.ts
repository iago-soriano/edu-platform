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
      MIN_LENGTH_WORDS: {
        BASIC: 100,
        INTERMEDIATE: 200,
        ADVANCED: 300,
      },
      MAX_LENGTH_WORDS: {
        BASIC: 300,
        INTERMEDIATE: 400,
        ADVANCED: 500,
      },
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
