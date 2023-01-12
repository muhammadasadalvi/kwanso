const router = require("express").Router();
const {
  createTask,
  allTaskListing,
} = require("../controllers/task/task.controller");
const { schemaValidator } = require("../utills/schema.validator");
const { createTaskSchema } = require("../schemas/task/task.schema");
// regsitering catergory routes
router.post("/", schemaValidator({ schema: createTaskSchema }), createTask); // call schema validator for creating task
router.get("/:pageNum-:limit", allTaskListing);

module.exports = router;
