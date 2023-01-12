const signUpSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      nullable: false,
      minLength: 10,
      maxLength: 100,
      format: "email",
      errorMessage: "Please Enter Valid Email address i.e. xyz@email.com",
    },
    password: {
      type: "string",
      nullable: false,
      minLength: 5,
      maxLength: 100,
      errorMessage: "email is not valid",
    },
  },
};

const signInSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      nullable: false,
      minLength: 10,
      maxLength: 100,
      format: "email",
      errorMessage: "Please Enter Valid Email address i.e. xyz@email.com",
    },
    password: {
      type: "string",
      nullable: false,
      minLength: 5,
      maxLength: 100,
      errorMessage: "Please enter valid password",
    },
  },
};
module.exports = {
  signUpSchema,
  signInSchema,
};
