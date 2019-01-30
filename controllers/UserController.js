const { user } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "There is an error.", err });
  }
};
