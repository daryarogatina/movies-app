const { Actor, Movie } = require("../models");
const { movieExistsError } = require("../helpers/index.js");
const { formatMovieResponse } = require("../helpers/index.js");

const createMovie = async (req, res) => {
  try {
    const { title, year, format, actors } = req.body;

    const existingMovie = await Movie.findOne({ where: { title } });

    if (existingMovie) {
      return res.status(400).json(movieExistsError);
    }

    const newMovie = await Movie.create({ title, year, format });

    const createdActors = await Promise.all(
      actors.map((actor) => Actor.create({ name: actor, MovieId: newMovie.id }))
    );

    await newMovie.addActors(createdActors);

    const fetchedMovie = await Movie.findByPk(newMovie.id, {
      include: Actor,
    });

    res.status(201).json(formatMovieResponse(fetchedMovie));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { createMovie };
