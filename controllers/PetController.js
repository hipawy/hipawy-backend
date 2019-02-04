const { sequelize } = require("../models");
const Pet = require("../models").pet;

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();

    res.status(200).json({ pets });
  } catch (err) {
    res.status(500).json({ message: "There is an error.", err });
  }
};
