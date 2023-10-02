const authenticationError = {
  status: 0,
  error: {
    fields: {
      email: "AUTHENTICATION_FAILED",
      password: "AUTHENTICATION_FAILED",
    },
    code: "AUTHENTICATION_FAILED",
  },
};

const existingUserError = {
  status: 0,
  error: {
    fields: {
      email: "NOT_UNIQUE",
    },
    code: "EMAIL_NOT_UNIQUE",
  },
};

const authenticateTokenError = {
  status: 0,
  error: {
    fields: {
      token: "REQUIRED",
    },
    code: "FORMAT_ERROR",
  },
};

module.exports = {
  authenticationError,
  existingUserError,
  authenticateTokenError,
};
