module.exports = (sequelize, Sequelize) => {
  const VehicleModels = sequelize.define("vehicle_models", {
    name: {
      type: Sequelize.STRING
    }
  });
  return VehicleModels;
};
