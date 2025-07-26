const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Article", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
