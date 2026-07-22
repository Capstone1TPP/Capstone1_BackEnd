const { Sequelize } = require("sequelize");

const dbConnection = new Sequelize(
  "postgres://localhost:5431/PollingApp",
);

module.exports = dbConnection;
