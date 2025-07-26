const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Bookmark", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });
};
