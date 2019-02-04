"use strict";
module.exports = (sequelize, DataTypes) => {
  const userPet = sequelize.define(
    "userPet",
    {
      status: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  userPet.associate = function(models) {
    models.userPet.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "id_user",
      targetKey: "id"
    });
    models.userPet.belongsTo(models.pet, {
      onDelete: "CASCADE",
      foreignKey: "id_pet",
      targetKey: "id"
    });
  };
  return userPet;
};
