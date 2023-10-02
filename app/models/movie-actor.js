const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const MovieActor = sequelize.define("MovieActor", {});

  return MovieActor;
};
