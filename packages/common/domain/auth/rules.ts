export const AuthRules = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  // PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
  PASSWORD_INSTRUCTION:
    "Senha deve conter pelo menos 8 caracteres, com letras e números",
};
