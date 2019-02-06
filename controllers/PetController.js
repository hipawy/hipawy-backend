const Pet = require("../models").pet;
const UserPet = require("../models").userPet;
const User = require("../models").user;

exports.getPets = async (req, res) => {
  if (req.query) {
    let condition = {};

    Object.keys(req.query).forEach(key =>
      Object.assign(condition, {
        [key]: { $like: `%${req.query[key]}%` }
      })
    );

    Pet.findAll({ where: { ...condition } })
      .then(pets => res.status(200).json({ pets }))
      .catch(err => res.status(500).json(err));
  } else {
    Pet.findAll()
      .then(pets => res.status(200).json({ pets }))
      .catch(err => res.status(500).json(err));
  }
};

exports.getPetUserById = async (req, res) => {
  try {
    const petUser = await UserPet.findOne({
      where: { id_pet: req.params.petId },
      include: [User]
    });

      res.status(200).json({ petUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
