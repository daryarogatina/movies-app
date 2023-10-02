const formatMovieResponse = (fetchedMovie) => {
  return {
    data: {
      id: fetchedMovie.id,
      title: fetchedMovie.title,
      year: fetchedMovie.year,
      format: fetchedMovie.format,
      actors: fetchedMovie.Actors.map(({ id, name, createdAt, updatedAt }) => ({
        id,
        name,
        createdAt,
        updatedAt,
      })),
      createdAt: fetchedMovie.createdAt,
      updatedAt: fetchedMovie.updatedAt,
    },
    status: 1,
  };
};

const formatMoviesListResponse = (movies) => {
  return {
    data: movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      format: movie.format,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    })),
    meta: {
      total: movies.length,
    },
    status: 1,
  };
};

const formatImportedMoviesResponse = (importedMovies) => {
  return {
    data: importedMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      format: movie.format,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    })),
    meta: {
      imported: importedMovies.length,
      total: importedMovies.length,
    },
    status: 1,
  };
};

module.exports = {
  formatMovieResponse,
  formatMoviesListResponse,
  formatImportedMoviesResponse,
};
