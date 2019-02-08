const { sequelize } = require("../models");
const User = require("../models").user;
const Pet = require("../models").pet;
const UserPet = require("../models").userPet;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

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

exports.createPet = async (req, res) => {
  try {
    sequelize.transaction(async transaction => {
      const pet = await Pet.create(req.body, { transaction });

      const userPet = await UserPet.create(
        {
          id_user: req.params.userId,
          id_pet: pet.id,
          status: "registered"
        },
        { include: [User, Pet], transaction }
      );

      res.status(200).json({ pet, userPet });
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getUserPets = async (req, res) => {
  try {
    const pets = await UserPet.findAll({
      where: { id_user: req.params.userId },
      include: [Pet]
    });

    res.status(200).json({ pets: pets.map(pet => pet.pet) });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getUserPetById = async (req, res) => {
  try {
    const pet = await UserPet.findOne({
      where: { id_user: req.params.userId, id_pet: req.params.petId },
      include: [Pet, User]
    });

    res.status(200).json({ pet });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.updateUserPetById = async (req, res) => {
  if (req.user.id.toString() === req.params.userId) {
    try {
      const [isUpdated] = await Pet.update(req.body, {
        where: { id: req.params.petId }
      });

      if (Boolean(isUpdated)) {
        const pet = await Pet.findById(req.params.petId);

        res.status(200).json({ pet });
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

exports.deletePetById = async (req, res) => {
  if (req.user.id.toString() === req.params.userId) {
    try {
      sequelize.transaction(async transaction => {
        await Pet.destroy({ where: { id: req.params.petId } }, { transaction });

        await UserPet.destroy(
          {
            where: {
              id_user: req.params.userId,
              id_pet: req.params.petId
            }
          },
          { include: [User, Pet], transaction }
        );

        res.status(200).json({ message: "Record deleted." });
      });
    } catch (err) {
      res.status(500).json({ message: "There is an error.", err });
    }
  } else {
    res.status(400).json({ message: "Token doesn't match" });
  }
};
