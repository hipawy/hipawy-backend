const express = require("express");
const router = express.Router();
const PetController = require("../controllers/PetController");

router.get("/", PetController.getPets);
router.route("/:petId/users/:userId").get(PetController.getPetUserById);

module.exports = router;
