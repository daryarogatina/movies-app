const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Actor = sequelize.define("Actor", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Actor;
};
