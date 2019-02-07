const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const PetController = require("../controllers/PetController");

router.get("/", PetController.getPets);
router
  .route("/:petId")
  .get(PetController.getPetUserById)
  .patch(isAuthenticated, PetController.updateUserPetById);

module.exports = router;
