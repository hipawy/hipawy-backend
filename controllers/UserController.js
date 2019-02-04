const { sequelize } = require("../models");
const User = require("../models").user;
const Pet = require("../models").pet;
const UserPet = require("../models").userPet;

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "There is an error.", err });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "There is an error.", err });
  }
};
