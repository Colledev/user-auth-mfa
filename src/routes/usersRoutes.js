const express = require("express");
const usersController = require("../controllers/usersController");
const { authenticateToken } = require("../middleware/authentication");
const router = express.Router();

router.post("/register", usersController.createUserController);
router.post("/login", usersController.loginController);
router.put("/edit", authenticateToken, usersController.editUserController);

module.exports = router;
