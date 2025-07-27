const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Article", {
    id: {
      type: DataTypes.INTEGER,   // use INTEGER instead of UUID
      autoIncrement: true,       // enable auto increment
      primaryKey: true,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail: DataTypes.STRING,
  });
};
