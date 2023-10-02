const { Actor, Movie } = require("../models");
const { movieNotFoundError } = require("../helpers/index.js");

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedMovie = await Movie.findByPk(id, {
      include: Actor,
    });

    if (!fetchedMovie) {
      return res.status(404).json(movieNotFoundError(id));
    }

    await fetchedMovie.destroy();

    res.status(200).json({
      status: 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { deleteMovie };
