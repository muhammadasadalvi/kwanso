const createTaskSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      nullable: false,
      errorMessage: "task name must be string",
    },
  },
};

module.exports = {
  createTaskSchema,
};
