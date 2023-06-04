module.exports = (sequelize, Sequelize) => {
  const VehicleTypes = sequelize.define("vehicle_types", {
    name: {
      type: Sequelize.STRING
    }
  });
  return VehicleTypes;
};
