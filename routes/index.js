const authRoutes = require("./auth.routes");
const router = require("express").Router();
const isUserAuthorized = require("../middlewares/tokenVerification");
const taskRoutes = require("./task.routes");
const { getUser } = require("../controllers/auth/auth.controller");
// define base routes for each module
router.use("/auth", authRoutes);

// call a middleware function "isUserAuthorized" for authorization
router.get("/user", isUserAuthorized, getUser);
router.use("/task", isUserAuthorized, taskRoutes);

module.exports = router;
