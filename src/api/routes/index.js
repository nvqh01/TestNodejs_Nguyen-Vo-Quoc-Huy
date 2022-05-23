const express = require("express");
const userRoute = require("./user.route");

const router = express.Router();

// Route "User"
router.use("/user", userRoute);

module.exports = router;
