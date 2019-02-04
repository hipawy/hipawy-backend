"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.ENUM("cat", "dog"), allowNull: false },
      breed: { type: DataTypes.STRING, allowNull: false },
      age: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      province: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.ENUM("male", "female"), allowNull: false },
      photo: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.TEXT, allowNull: false }
    },
    {}
  );
  pet.associate = function(models) {
    models.pet.hasMany(models.userPet, {
      foreignKey: "id_pet",
      sourceKey: "id"
    });
  };
  return pet;
};
