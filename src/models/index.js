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
db.vehicle_models = require("./vehicle_models.model.js")(sequelize, Sequelize);
db.vehicle_years = require("./vehicle_years.model.js")(sequelize, Sequelize);
db.price_list = require("./price_list.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

// Relasi antar vehicle_brands dan vehicle_types yaitu one to many
db.vehicle_brands.hasMany(db.vehicle_types,{
  foreignKey: "brand_id",
});
db.vehicle_types.belongsTo(db.vehicle_brands,{
  foreignKey: "brand_id",
});

// Relasi antar vehicle_types dan vehicle_models yaitu one to many
db.vehicle_types.hasMany(db.vehicle_models,{
  foreignKey: "type_id",
});
db.vehicle_models.belongsTo(db.vehicle_types,{
  foreignKey: "type_id",
});

// Relasi antar vehicle_models dan pricelist yaitu one to many
db.vehicle_models.hasMany(db.price_list,{
  foreignKey: "model_id",
});
db.price_list.belongsTo(db.vehicle_models,{
  foreignKey: "model_id",
});

// Relasi antar vehicle_years dan pricelist yaitu one to many
db.vehicle_years.hasMany(db.price_list,{
  foreignKey: "year_id",
});
db.price_list.belongsTo(db.vehicle_years,{
  foreignKey: "year_id",
});


module.exports = db;
