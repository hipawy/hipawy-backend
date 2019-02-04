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

exports.updateUserById = async (req, res) => {
  if (req.user.id.toString() === req.params.id) {
    try {
      const [isUpdated] = await User.update(req.body, {
        where: { id: req.params.id }
      });

      if (Boolean(isUpdated)) {
        const user = await User.findById(req.params.id);

        res.status(200).json({ user });
      } else {
        res.status(400).json({});
      }
    } catch (err) {
      res.status(500).json({ message: "There is an error.", err });
    }
  } else {
    res.status(400).json({ message: "Token doesn't match" });
  }
};
