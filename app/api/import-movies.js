const { Actor, Movie, MovieActor } = require("../models");
const { formatImportedMoviesResponse } = require("../helpers/index");
const fs = require("fs");

const importMovies = async (req, res) => {
  const file = req.file;
  const filePath = file.path;

  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Failed to read file:", err);
      return res.status(500).json({ error: "Failed to read file." });
    }

    const movies = [];
    const movieRegex =
      /Title: (.+)\nRelease Year: (\d+) ?\nFormat: (.+)\nStars: (.+)/g;
    let match;

    while ((match = movieRegex.exec(data)) !== null) {
      const [, title, releaseYear, format, stars] = match;
      const movie = {
        title,
        year: parseInt(releaseYear),
        format,
        actors: stars.split(", "),
      };
      movies.push(movie);
    }

    try {
      for (const movie of movies) {
        const { title, year, format, actors } = movie;

        const existingMovie = await Movie.findOne({ where: { title } });

        if (existingMovie) {
          continue;
        }
        const createdMovie = await Movie.create({ title, year, format });

        for (const actorName of actors) {
          let actor = await Actor.findOne({ where: { name: actorName } });

          if (!actor) {
            actor = await Actor.create({ name: actorName });
          }

          await MovieActor.create({
            MovieId: createdMovie.id,
            ActorId: actor.id,
          });
        }
      }

      const importedMovies = await Movie.findAll({
        where: {
          title: movies.map((movie) => movie.title),
        },
      });

      res.status(200).json(formatImportedMoviesResponse(importedMovies));
    } catch (error) {
      console.error("Failed to import movies:", error);
      res.status(500).json({ error: "Failed to import movies." });
    }
  });
};

module.exports = { importMovies };
