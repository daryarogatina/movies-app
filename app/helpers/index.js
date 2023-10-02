const { movieExistsError } = require("./movies-errors");
const { authenticationError } = require("./authentication-errors");
const { existingUserError } = require("./authentication-errors");
const { authenticateTokenError } = require("./authentication-errors");
const { movieNotFoundError } = require("./movies-errors");
const { moviesListNotFoundError } = require("./movies-errors");
const { formatMovieResponse } = require("./response-utils");
const { formatMoviesListResponse } = require("./response-utils");
const { formatImportedMoviesResponse } = require("./response-utils");

module.exports = {
  movieExistsError,
  movieNotFoundError,
  moviesListNotFoundError,
  authenticationError,
  existingUserError,
  authenticateTokenError,
  formatMovieResponse,
  formatMoviesListResponse,
  formatImportedMoviesResponse,
};
