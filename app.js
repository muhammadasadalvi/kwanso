// importing packages
const express = require("express");
const path = require("path");

// import error handler middleware
const erroHandler = require("./utills/error-handler");

// import sequelize to sync models with database
const { sequelize } = require("./database");
sequelize.sync({ alter: true }).then(() => {
  console.log("database tables created!");
});
// importing to access environment variables in app
require("dotenv").config();

// importing app routes
const appRoutes = require("./routes");

// creates an express application
const app = express();

// parses incomming request to json
app.use(express.json());
// parses url encoded paylaods
app.use(express.urlencoded());
// error handler middle-ware
app.use(erroHandler);

// built in middleware function to serve static files
app.use(express.static(path.join(__dirname, "public")));

// registering all app routes
app.use("/api/v1", appRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is Running on Port ${process.env.PORT || 3001}`);
});
