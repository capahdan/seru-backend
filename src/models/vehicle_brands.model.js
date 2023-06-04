module.exports = (sequelize, Sequelize) => {
  const VehicleBrands = sequelize.define("vehicle_brands", {
    name: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    }
  });

  return VehicleBrands;
};
