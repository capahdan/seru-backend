module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER ||"postgres",
  PASSWORD: process.env.DB_PASSWORD ||"Advent777",
  DB: process.env.DB_DATABASE || "seru",
  PORT: process.env.DB_PORT || 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
