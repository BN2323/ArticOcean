const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,   // use INTEGER instead of UUID
      autoIncrement: true,       // enable auto increment
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // add other fields if needed
  });

  return Comment;
};
