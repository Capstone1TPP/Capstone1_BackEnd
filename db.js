const { Sequelize } = require("sequelize");

const dbConnection = new Sequelize(
  "postgres://postgres:Luyangmei123@localhost:5432/PollingApp",
);

module.exports = dbConnection;
