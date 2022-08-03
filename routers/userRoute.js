const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);
router.get("/getAllUsers", userController.getAllUsers);
router.delete("/deleteUsers", userController.deleteUsers);

module.exports = router;
