module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define(
    "task",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      enable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true, // sequelize will create timestamps
      underscored: true, // name will be stored in db as underscored (e.g taskId => task_id)
      freezeTableName: true, // table name as same we provide
      tableName: "task", // database table name
    }
  );
  return Task;
};
