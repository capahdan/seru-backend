module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Advent777",
  DB: "seru",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
