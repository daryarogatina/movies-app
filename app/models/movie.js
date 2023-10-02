const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Movie = sequelize.define("Movie", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    format: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Movie;
};
