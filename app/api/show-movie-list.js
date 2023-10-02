const { Actor, Movie } = require("../models");
const Sequelize = require("sequelize");
const { moviesListNotFoundError } = require("../helpers/index.js");
const { formatMoviesListResponse } = require("../helpers/index.js");

const showMovieList = async (req, res) => {
  try {
    const { sort, order, limit, offset, title, search, actor } = req.query;

    let sortOptions = [["id", "ASC"]];

    if (sort) {
      if (sort === "title") {
        sortOptions = [["title", order === "DESC" ? "DESC" : "ASC"]];
      } else if (sort === "year") {
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
      searchConditions.push({
        [Sequelize.Op.or]: [
          {
            "$Actors.name$": {
              [Sequelize.Op.like]: `%${actor}%`,
            },
          },
        ],
      });
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
