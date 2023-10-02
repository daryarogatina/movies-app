const movieExistsError = {
  status: 0,
  error: {
    fields: {
      title: "NOT_UNIQUE",
    },
    code: "MOVIE_EXISTS",
  },
};

const movieNotFoundError = (id) => {
  return {
    status: 0,
    error: {
      fields: {
        id: id,
      },
      code: "MOVIE_NOT_FOUND",
    },
  };
};

const moviesListNotFoundError = (id) => {
  return {
    status: 0,
    error: {
      fields: {
        id: id,
      },
      code: "MOVIE_NOT_FOUND",
    },
  };
};

module.exports = {
  movieExistsError,
  movieNotFoundError,
  moviesListNotFoundError,
};
