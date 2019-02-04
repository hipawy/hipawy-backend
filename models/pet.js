"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: DataTypes.STRING,
      category: DataTypes.ENUM("cat", "dog"),
      breed: DataTypes.STRING,
      age: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
      photo: DataTypes.STRING,
      desc: DataTypes.TEXT
    },
    {}
  );
  pet.associate = function(models) {
    // associations can be defined here
  };
  return pet;
};
