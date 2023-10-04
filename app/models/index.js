const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE,
});

const Actor = require("./actor")(sequelize);
const Movie = require("./movie")(sequelize);
const MovieActor = require("./movie-actor")(sequelize);
const User = require("./user")(sequelize);

Movie.belongsToMany(Actor, { through: MovieActor });
Actor.belongsToMany(Movie, { through: MovieActor });

sequelize.sync();

module.exports = {
  Actor,
  Movie,
  MovieActor,
  User,
};
