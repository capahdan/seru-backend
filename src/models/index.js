const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER,
   dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vehicle_brands = require("./vehicle_brands.model.js")(sequelize, Sequelize);
db.vehicle_types = require("./vehicle_types.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

// db.vehicle_brands.hasMany(db.vehicle_types);
db.vehicle_types.belongsTo(db.vehicle_brands,{
  foreignKey: "brand_id",
});

module.exports = db;
