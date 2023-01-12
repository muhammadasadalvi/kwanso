const router = require("express").Router();
const { signUp, signIn } = require("../controllers/auth/auth.controller");
const { schemaValidator } = require("../utills/schema.validator");
const { signUpSchema, signInSchema } = require("../schemas/auth/auth.schema");

// call schema validator as middleware function for veifying user input
router.post("/signup", schemaValidator({ schema: signUpSchema }), signUp);
router.post("/signin", schemaValidator({ schema: signInSchema }), signIn);

module.exports = router;
