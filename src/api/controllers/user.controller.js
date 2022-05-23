const { User } = require("../models/index");
const { catchAsync } = require("../helpers/catchAsync");

module.exports = {
  // Add user
  addUser: catchAsync(async (req, res, next) => {
    // Get user data from body
    const { firstName, lastName, age, coordinate } = req.body;
    // Check user data entered fully
    if (!firstName || !lastName || !age || !coordinate) {
      return next(new Error("Please enter full information !"));
    }
    // Format coordinate in xxx:yyy (0 < x, y < 9)
    if (!/^([0-9]{3}:[0-9]{3})$/.test(coordinate)) {
      return next(new Error("Coordinate is not valid !"));
    }
    // Declare variable "User" from body
    const user = { firstName, lastName, age, coordinate };
    // Add user to database
    const savedUser = await User.addUser(user);
    // Respone result
    res.json({
      success: true,
      data: savedUser,
      error: null,
    });
  }),
  // Get user by id
  getUserById: catchAsync(async (req, res, next) => {
    //Get user id from query string
    const { id } = req.query;
    // Check user id entered
    if (!id) {
      return next(new Error("Please enter user id !"));
    }
    // Get user data by id
    const user = await User.getById(id);
    // Respone result
    res.json({
      success: true,
      data: user,
      error: null,
    });
  }),
  // Find users by name
  findUsersByName: catchAsync(async (req, res, next) => {
    // Get user name from query string
    const { name } = req.query;
    // Check user name entered
    if (!name) {
      return next(new Error("Please enter user name !"));
    }
    // Get user data by name
    const user = await User.findUsersByName(name);
    // Respone result
    res.json({
      success: true,
      data: user,
      error: null,
    });
  }),
  // Update user
  updateUser: catchAsync(async (req, res, next) => {
    //Get user id from query string
    const { id } = req.params;
    // Get user data from body
    const { firstName, lastName, age, coordinate } = req.body;
    // Declare variable "User"
    const user = { id, firstName, lastName, age, coordinate };
    // Update user data
    const updatedUser = await User.updateUser(user);
    // Respone result
    res.json({
      success: true,
      data: updatedUser,
      error: null,
    });
  }),
  // Delete user
  deleteUser: catchAsync(async (req, res, next) => {
    //Get user id from query string
    const { id } = req.params;
    // Delete user
    const message = await User.deleteUser(id);
    // Respone result
    res.json({
      success: true,
      data: message,
      error: null,
    });
  }),
  // Get users by id
  getUsersById: catchAsync(async (req, res, next) => {
    //Get amount n and user id from query string
    const { n, userId } = req.query;
    // Get users data nearby user id
    const users = await User.getUsersById(n, userId);
    // Respone result
    res.json({
      success: true,
      data: users,
      error: null,
    });
  }),
};
