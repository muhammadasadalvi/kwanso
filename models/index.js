const { sequelize, Sequelize } = require("../database");

// importing models
const User = require("./user.model");
const OauthToken = require("./oauthtoken.model");
const Task = require("./task.model");

// initializing models
const UserModel = User(sequelize, Sequelize);
const OauthTokenModel = OauthToken(sequelize, Sequelize);
const TaskModel = Task(sequelize, Sequelize);

// sequelize.sync({force:true});

// defining relationships
UserModel.hasOne(OauthTokenModel, { foreignKey: "user_id" }); // User has only one token at a time
OauthTokenModel.belongsTo(UserModel);

UserModel.hasMany(TaskModel, { foreignKey: "user_id" }); // User has many tasks
TaskModel.belongsTo(UserModel);

module.exports = {
  UserModel,
  OauthTokenModel,
  TaskModel,
};
