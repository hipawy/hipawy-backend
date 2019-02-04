const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const UserController = require("../controllers/UserController");

router.get("/", isAuthenticated, UserController.getUsers);

router
  .route("/:id")
  .get(isAuthenticated, UserController.getUserById)
  .patch(isAuthenticated, UserController.updateUserById);

router
  .route("/:userId/pets")
  .post(isAuthenticated, UserController.createPet)
  .get(UserController.getUserPets);

router
  .route("/:userId/pets/:petId")
  .get(isAuthenticated, UserController.getUserPetById)
  .patch(isAuthenticated, UserController.updateUserPetById)
  .delete(isAuthenticated, UserController.deletePetById);
module.exports = router;
