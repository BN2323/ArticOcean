const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,   // use INTEGER instead of UUID
      autoIncrement: true,       // enable auto increment
      primaryKey: true,
    },
  });
};
