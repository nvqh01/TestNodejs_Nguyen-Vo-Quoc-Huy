const fs = require("fs-extra");
const { catchAsync } = require("../api/helpers/catchAsync");

const fileName = "src/config/database/db.json";

module.exports = {
  // Connect database
  connectDB: async () => {
    try {
      const db = await fs.readJSON(fileName);
      console.log("Connect database successfully !");
      return await db;
    } catch (err) {
      console.log(`Fail to connect database !\n${err.message}`);
    }
  },
  // Update database
  updateDB: async (data) => {
    await fs.writeJson(fileName, data, { spaces: 2 });
    console.log("Update database successfully !");
  },
};
