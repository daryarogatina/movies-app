const { Actor, Movie } = require("../models");
const { movieNotFoundError } = require("../helpers/index.js");
const { formatMovieResponse } = require("../helpers/index.js");

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, year, format, actors } = req.body;

    const fetchedMovie = await Movie.findByPk(id, {
      include: Actor,
    });

    if (!fetchedMovie) {
      return res.status(404).json(movieNotFoundError(id));
    }

    await fetchedMovie.update({
      title,
      year,
      format,
    });

    await fetchedMovie.setActors([]);

    const createdActors = await Promise.all(
      actors.map((actor) => Actor.create({ name: actor }))
    );
    await fetchedMovie.addActors(createdActors);

    const updatedMovie = await Movie.findByPk(id, {
      include: Actor,
    });

    res.status(201).json(formatMovieResponse(updatedMovie));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { updateMovie };
