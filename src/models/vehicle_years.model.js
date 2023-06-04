module.exports = (sequelize, Sequelize) => {
  const VehicleYears = sequelize.define("vehicle_years", {
    year: {
      type: Sequelize.STRING
    }
  });
  return VehicleYears;
};
