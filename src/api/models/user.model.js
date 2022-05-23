const db = require("../../config/db.config");
const { v4: uuid } = require("uuid");

let db_json;
let users;
// Connect database to get data in json
db.connectDB().then((data) => {
  db_json = data; // Get data
  users = data.users; // Get user data
});

const User = {
  // Add user
  async addUser(_user) {
    // Declare variable "User"
    let user = { id: uuid(), ..._user };
    // Push new user data into users data
    users.push(user);
    // Update database
    await db.updateDB({ ...db_json, users });
    // Return new user data
    return user;
  },
  // Get user data by id
  async getById(id) {
    // Find user data by id
    const user = users.find((user) => user.id === id);
    // Return user data by id
    return user;
  },
  // Find users by name
  findUsersByName(name) {
    // Find users data by first name or last name
    let neededUsers = users.filter(
      (user) => user.firstName === name || user.lastName === name
    );
    // Sort descending users data by first name
    neededUsers.sort((firstUser, secondUser) => {
      secondUser.firstName.localeCompare(firstUser.firstName);
    });
    // Return needed users data
    return neededUsers;
  },
  // Update user
  async updateUser(_user) {
    // Find index of user data in users data
    const index = users.findIndex((user) => user.id === _user.id);
    // Check user data founded
    if (index < 0) {
      throw new Error("Not found user !");
    }
    // Remove undefined fields in user data
    Object.keys(_user).forEach(
      (key) => _user[key] === undefined && delete _user[key]
    );
    console.log(_user);
    // Update user data
    users[index] = { ...users[index], ..._user };
    // Update database
    await db.updateDB({ ...db_json, users });
    // return user data updated
    return users[index];
  },
  // Delete user
  async deleteUser(id) {
    // Find index of user data in users data
    const index = users.findIndex((user) => user.id === id);
    // Check user data founded
    if (index < 0) {
      throw new Error("Not found user !");
    }
    // Remove user data from users data
    users.splice(index, 1);
    // Update database
    await db.updateDB({ ...db_json, users });
    // return user data deleted
    return `User ${id} is deleted !`;
  },
  // Get users by id
  async getUsersById(n, id) {
    // Find index of user data in users data
    const index = users.findIndex((user) => user.id === id);
    // Check user data founded
    if (index < 0) {
      throw new Error("Not found user !");
    }
    // Find users nearby user id with amount n
    const neededUsers = users.slice(index, index + ++n);
    // Sort ascending users data
    neededUsers.sort((firstUser, secondUser) =>
      firstUser.id.localeCompare(secondUser.id)
    );
    // Return needed users data
    return neededUsers;
  },
};

module.exports = User;
