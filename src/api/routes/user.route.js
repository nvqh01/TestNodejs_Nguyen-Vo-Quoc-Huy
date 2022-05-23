const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

// Route "Add user"
router.post("/add", userController.addUser);

// Route "Get user by id"
router.get("/read", userController.getUserById);

// Route "Find users by name"
router.get("/search", userController.findUsersByName);

// Route "Update user"
router.put("/edit/:id", userController.updateUser);

// Route "Delete user"
router.delete("/edit/:id", userController.deleteUser);

// Route "Get users by id"
router.get("/locate", userController.getUsersById);

module.exports = router;
