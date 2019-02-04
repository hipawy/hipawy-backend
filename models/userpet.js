'use strict';
module.exports = (sequelize, DataTypes) => {
  const userPet = sequelize.define('userPet', {
    status: DataTypes.STRING
  }, {});
  userPet.associate = function(models) {
    // associations can be defined here
  };
  return userPet;
};