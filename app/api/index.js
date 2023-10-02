const { createMovie } = require("./create-movie");
const { showMovie } = require("./show-movie");
const { deleteMovie } = require("./delete-movie");
const { updateMovie } = require("./update-movie");
const { importMovies } = require("./import-movies");
const { showMovieList } = require("./show-movie-list");

module.exports = {
  createMovie,
  showMovie,
  deleteMovie,
  updateMovie,
  importMovies,
  showMovieList,
};
