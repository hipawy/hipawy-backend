const Pet = require("../models").pet;

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
