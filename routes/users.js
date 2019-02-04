const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const UserController = require("../controllers/UserController");

router.get("/", isAuthenticated, UserController.getUsers);

router
  .route("/:id")
  .get(isAuthenticated, UserController.getUserById)
  .patch(isAuthenticated, UserController.updateUserById);

module.exports = router;
