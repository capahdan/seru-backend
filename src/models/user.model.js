module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone_number:{
      type: Sequelize.INTEGER
    },
    is_admin: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
