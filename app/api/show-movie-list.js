const { Actor, Movie, MovieActor } = require("../models");
const Sequelize = require("sequelize");
const { moviesListNotFoundError } = require("../helpers/index.js");
const { formatMoviesListResponse } = require("../helpers/index.js");
const { formatMoviesWithActorsResponse } = require("../helpers/index.js");

const showMovieList = async (req, res) => {
  try {
    const { sort, order, limit, offset, title, search, actor } = req.query;

    if (sort) {
      if (sort === "title") {
        let sortOrder = "ASC";
        if (order && order === "DESC") {
          sortOrder = "DESC";
        }

        let movies = await Movie.findAll({
          include: [Actor],
          limit: limit ? parseInt(limit) : null,
          offset: offset ? parseInt(offset) : null,
        });

        if (!movies || movies.length === 0) {
          return res.status(404).json(moviesListNotFoundError);
        }

        movies = movies.sort((a, b) => {
          return a.title.localeCompare(b.title, "uk-UA", {
            sensitivity: "base",
          });
        });

        if (sortOrder === "DESC") {
          movies.reverse();
        }
        return res.status(200).json(formatMoviesListResponse(movies));
      }

      if (sort === "year") {
        sortOptions = [["year", order === "DESC" ? "DESC" : "ASC"]];
      }
    }

    const options = {
      include: Actor,
      order: sortOptions,
      limit: limit ? parseInt(limit) : null,
      offset: offset ? parseInt(offset) : null,
    };

    const searchConditions = [];

    if (title) {
      searchConditions.push({ title: { [Sequelize.Op.like]: `%${title}%` } });
    }

    if (search) {
      searchConditions.push({
        [Sequelize.Op.or]: [
          {
            "$Actors.name$": {
              [Sequelize.Op.like]: `%${search}%`,
            },
          },
        ],
      });
    }

    if (actor) {
      const takeActors = await Actor.findAll({
        attributes: [],
        where: {
          name: {
            [Sequelize.Op.like]: `%${actor}%`,
          },
        },
        include: [
          {
            model: Movie,
          },
        ],
      });

      let actorsArray = [];
      if (takeActors) {
        takeActors.forEach((actor) =>
          actor.Movies.forEach((movie) => {
            actorsArray.push(movie.id);
          })
        );
      }

      const actorsMovies = await Movie.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: actorsArray,
          },
        },
        include: [
          {
            model: Actor,
          },
        ],
      });

      return res.status(200).json(formatMoviesWithActorsResponse(actorsMovies));
    }

    if (searchConditions.length > 0) {
      options.where = {
        [Sequelize.Op.and]: searchConditions,
      };
    }

    const movies = await Movie.findAll(options);

    if (!movies || movies.length === 0) {
      return res.status(404).json(moviesListNotFoundError);
    }
    res.status(200).json(formatMoviesListResponse(movies));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { showMovieList };
