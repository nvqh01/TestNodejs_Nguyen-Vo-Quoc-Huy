const express = require("express");
const router = require("./api/routes");
const { errorHandler } = require("./api/middlewares/errorHandler");

const app = express();
const PORT = 8000;

// Use middleware "body-parser"
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/", router);

// Catch error "Route not found"
app.use((req, res, next) => {
  next(new Error("This route is not fonud !"));
});

// Handle errors
app.use(errorHandler);

// Listen server
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
