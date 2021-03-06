const debug = require("debug")("property-exchange:db-connection");
const { Sequelize, DataTypes } = require("sequelize");
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// const dbUrl = `postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl=true`;

// const sequelize = new Sequelize(dbUrl);

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PWD,
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
});

sequelize
  .authenticate()
  .then(() => {
    debug("Connection has been established successfully.");
  })
  .catch(err => {
    debug("Unable to connect to the database:", err);
  });

module.exports = { sequelize, DataTypes };
