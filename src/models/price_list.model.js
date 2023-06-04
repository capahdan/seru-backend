module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("price_list", {
    price: {
      type: Sequelize.INTEGER
    },
    currency: {
      type: Sequelize.STRING
    }
  });
  return PriceList;
};
