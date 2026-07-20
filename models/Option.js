const db = require("../db");
const { DataTypes } = require("sequelize");

const Option = db.define("option", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Option;
