require("dotenv").config();

module.exports = {
  host: "localhost",
  database: process.env.DATABASE_NAME || "kwanso",
  username: process.env.DATABAE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD || "password",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5, // maximum connection in pool
    min: 0, // minimum number of connection in pool
    acquire: 30000, // max time in miliseconds, try for connetion before throwing error
    idle: 10000, // idle time in miliseconds to release resource
  },
};
